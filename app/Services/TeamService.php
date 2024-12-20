<?php

namespace App\Services;

use App\Models\Team;
use App\Models\TeamMapping;
use App\Models\TeamRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TeamService
{
  protected $driveService;

  public function __construct(DriveService $driveService)
  {
    $this->driveService = $driveService;
  }

  /**
   * Generate a unique team code.
   *
   * @return string
   */
  public function generateUniqueTeamCode(): string
  {
    do {
      $code = $this->randomTeamCode();
    } while (Team::where('code', $code)->exists());

    return $code;
  }

  /**
   * Generate a random alphanumeric code.
   *
   * @return string
   */
  public function randomTeamCode(): string
  {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $length = 8;
    return substr(str_shuffle(str_repeat($characters, $length)), 0, $length);
  }

  /**
   * Validate and retrieve the requested team.
   *
   * @param int $teamId
   * @return Team|null
   */
  public function getTeamOrFail($teamId)
  {
    return Team::find($teamId);
  }

  /**
   * Retrieve a user's role in a team.
   *
   * @param int $teamId
   * @param int $userId
   * @return TeamMapping|null
   */
  public function getUserTeamMapping($teamId, $userId)
  {
    return TeamMapping::where('team_id', $teamId)
      ->where('user_id', $userId)
      ->first();
  }

  public function createTeam(Request $request): Team
  {
    $team = new Team();
    $team->name = $request->name;
    $team->description = $request->description;
    $team->code = $this->generateUniqueTeamCode();
    $team->save();

    return $team;
  }

  public function assignOwnerRole($teamId, $userId)
  {
    $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

    TeamMapping::create([
      'team_id' => $teamId,
      'user_id' => $userId,
      'role_id' => $ownerRoleId,
      'joined_at' => now(),
    ]);
  }

  public function uploadTeamIcon($team, $icon)
  {
    $folderId = $this->driveService->getTeamIconFolderId();
    $fileName = "{$team->id}_" . time() . "." . $icon->getClientOriginalExtension();
    $result = $this->driveService->uploadFile($fileName, $icon, $folderId);

    $team->icon = $this->driveService->getImageLink($result->id);
    $team->is_gdrive_icon = true;
    $team->save();
  }

  public function isUserAlreadyMember($teamId, $userId): bool
  {
    return TeamMapping::where('team_id', $teamId)
      ->where('user_id', $userId)
      ->exists();
  }

  public function createGuestRole($teamId, $userId)
  {
    $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;

    TeamMapping::create([
      'team_id' => $teamId,
      'user_id' => $userId,
      'role_id' => $guestRoleId,
    ]);
  }

  public function getTeamApplicationsWithDetails($teamId, $guestRoleId)
  {
    return DB::table('teams_mapping')
      ->join('users', 'teams_mapping.user_id', '=', 'users.id')
      ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
      ->select(
        'users.id',
        'users.name',
        'users.avatar',
        'users.email',
        DB::raw("'Guest' as role")
      )
      ->where('teams_mapping.team_id', $teamId)
      ->where('teams_mapping.role_id', $guestRoleId)
      ->get();
  }

  public function getTeamOwner($teamId)
  {
    return DB::table('teams_mapping')
      ->join('users', 'teams_mapping.user_id', '=', 'users.id')
      ->where('teams_mapping.team_id', $teamId)
      ->where('teams_mapping.role_id', TeamRole::where('name', 'Owner')->first()->id)
      ->select(
        'users.id',
        'users.name',
        'users.avatar',
        'users.email',
        DB::raw("'Owner' as role")
      )
      ->first();
  }

  public function getTeamsForUser($userId)
  {
    return DB::table("teams")
      ->join("teams_mapping", "teams.id", "=", "teams_mapping.team_id")
      ->join("teams_roles", "teams_mapping.role_id", "=", "teams_roles.id")
      ->where("teams_mapping.user_id", $userId)
      ->where("teams_roles.name", "!=", "Guest")
      ->select("teams.*", "teams_roles.name as role_name")
      ->get();
  }

  public function getTeamMembersWithDetails($teamId)
  {
    $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;

    return DB::table('teams_mapping')
      ->join('users', 'teams_mapping.user_id', '=', 'users.id')
      ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
      ->select(
        'users.id',
        'users.name',
        'users.avatar',
        'users.email',
        'teams_roles.name as role'
      )
      ->where('teams_mapping.team_id', $teamId)
      ->where('teams_mapping.role_id', '!=', $guestRoleId)
      ->orderByRaw("
              CASE 
                  WHEN teams_roles.name = 'Owner' THEN 0 
                  ELSE 1 
              END, 
              teams_mapping.joined_at ASC
          ")
      ->get();
  }

  /**
   * Delete a team's icon from Google Drive.
   */
  public function deleteTeamIcon(Team $team)
  {
    if ($team->is_gdrive_icon && $team->icon) {
      $fileId = $this->driveService->getFileIdFromUrl($team->icon);
      $this->driveService->deleteFile($fileId);

      // Reset the icon fields in the database
      $team->icon = null;
      $team->is_gdrive_icon = false;
      $team->save();
    }
  }
}
