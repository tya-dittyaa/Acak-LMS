<?php

namespace App\Services;

use App\Models\TeamRole;
use Illuminate\Support\Facades\DB;

class TeamService
{
  public function getTeamsForUser($userId)
  {
    return DB::table("teams")
      ->join("teams_mapping", "teams.id", "=", "teams_mapping.teams_id")
      ->join("teams_roles", "teams_mapping.role_id", "=", "teams_roles.id")
      ->where("teams_mapping.member_id", $userId)
      ->where("teams_roles.name", "!=", "Guest")
      ->select("teams.*", "teams_roles.name as role_name")
      ->get();
  }

  public function getTeamMembersWithDetails($teamId)
  {
    $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;

    return DB::table('teams_mapping')
      ->join('users', 'teams_mapping.member_id', '=', 'users.id')
      ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
      ->select(
        'users.id',
        'users.name',
        'users.avatar',
        'users.email',
        'teams_roles.name as role'
      )
      ->where('teams_mapping.teams_id', $teamId)
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
}
