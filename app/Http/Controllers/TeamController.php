<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamMapping;
use App\Models\TeamRole;
use App\Services\DriveService;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class TeamController extends Controller
{
    protected $driveService, $teamService;

    public function __construct(DriveService $driveService, TeamService $teamService)
    {
        $this->driveService = $driveService;
        $this->teamService = $teamService;
    }

    /**
     * Generate a unique team code.
     *
     * @return string
     */
    private function generateUniqueTeamCode(): string
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
    private function randomTeamCode(): string
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
    private function getTeamOrFail($teamId)
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
    private function getUserTeamMapping($teamId, $userId)
    {
        return TeamMapping::where('teams_id', $teamId)
            ->where('member_id', $userId)
            ->first();
    }

    /**
     * Display the team dashboard.
     */
    public function show(Request $request, $teamId)
    {
        $team = $this->getTeamOrFail($teamId);

        if (!$team) {
            return Inertia::render('Error', ['status' => 404]);
        }

        $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;
        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);

        if (!$teamMapping || $teamMapping->role_id === $guestRoleId) {
            return Inertia::render('Error', ['status' => 403]);
        }

        $teamMembers = $this->teamService->getTeamMembersWithDetails($teamId);
        $teamApplications = $this->getTeamApplicationsWithDetails($teamId, $guestRoleId);

        return inertia('Teams/Details/TeamDetails', [
            'team' => $team,
            'teamMembers' => $teamMembers,
            'teamApplications' => $teamApplications,
            'teamOwner' => $this->getTeamOwner($teamId),
        ]);
    }

    /**
     * Create a new team.
     */
    public function store(Request $request)
    {
        $request->validate($this->teamValidationRules(), $this->teamValidationMessages());

        if (Team::where('name', $request->name)->exists()) {
            return redirect()->back()->withErrors(['name' => 'This team name is already in use. Please choose another name.']);
        }

        $team = $this->createTeam($request);
        $this->assignOwnerRole($team->id, $request->user()->id);

        if ($request->hasFile('icon')) {
            $this->uploadTeamIcon($team, $request->file('icon'));
        }

        return redirect()->back()
            ->with('status', 'Team created successfully.')
            ->with('newTeam', $team);
    }

    /**
     * Apply to join a team.
     */
    public function apply(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'team_code' => ['required', 'string', 'min:8', 'max:8', 'exists:teams,code'],
        ], $this->applicationValidationMessages());

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $team = Team::where('code', $request->team_code)->first();

        if ($this->isUserAlreadyMember($team->id, $request->user()->id)) {
            return redirect()->back()->withErrors(['team_code' => 'You have already joined or applied to this team.']);
        }

        $this->createGuestRole($team->id, $request->user()->id);

        return redirect()->back()->with('status', 'Your application to join the team has been successfully sent.');
    }

    // Private helper methods for refactoring
    private function teamValidationRules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'description' => ['nullable', 'string', 'min:3', 'max:255'],
            'icon' => ['nullable', 'file', 'image', 'max:2048', 'mimes:png,jpg,jpeg'],
        ];
    }

    private function teamValidationMessages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.min' => 'The name must be at least 3 characters.',
            'name.max' => 'The name must not be greater than 100 characters.',
        ];
    }

    private function applicationValidationMessages(): array
    {
        return [
            'team_code.required' => 'The team code is required.',
            'team_code.exists' => 'No team found with the provided code.',
        ];
    }

    private function createTeam(Request $request): Team
    {
        $team = new Team();
        $team->name = $request->name;
        $team->description = $request->description;
        $team->code = $this->generateUniqueTeamCode();
        $team->save();

        return $team;
    }

    private function assignOwnerRole($teamId, $userId)
    {
        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        TeamMapping::create([
            'teams_id' => $teamId,
            'member_id' => $userId,
            'role_id' => $ownerRoleId,
            'joined_at' => now(),
        ]);
    }

    private function uploadTeamIcon($team, $icon)
    {
        $folderId = $this->driveService->getTeamIconFolderId();
        $fileName = "{$team->id}_" . time() . "." . $icon->getClientOriginalExtension();
        $result = $this->driveService->uploadFile($fileName, $icon, $folderId);

        $team->icon = $this->driveService->getImageLink($result->id);
        $team->is_gdrive_icon = true;
        $team->save();
    }

    private function isUserAlreadyMember($teamId, $userId): bool
    {
        return TeamMapping::where('teams_id', $teamId)
            ->where('member_id', $userId)
            ->exists();
    }

    private function createGuestRole($teamId, $userId)
    {
        $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;

        TeamMapping::create([
            'teams_id' => $teamId,
            'member_id' => $userId,
            'role_id' => $guestRoleId,
        ]);
    }

    private function getTeamApplicationsWithDetails($teamId, $guestRoleId)
    {
        return DB::table('teams_mapping')
            ->join('users', 'teams_mapping.member_id', '=', 'users.id')
            ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
            ->select(
                'users.id',
                'users.name',
                'users.avatar',
                'users.email',
                DB::raw("'Guest' as role")
            )
            ->where('teams_mapping.teams_id', $teamId)
            ->where('teams_mapping.role_id', $guestRoleId)
            ->get();
    }

    private function getTeamOwner($teamId)
    {
        return DB::table('teams_mapping')
            ->join('users', 'teams_mapping.member_id', '=', 'users.id')
            ->where('teams_mapping.teams_id', $teamId)
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

    /**
     * Kick a member from the team.
     */
    public function kickMember(Request $request, $teamId, $memberId)
    {
        $team = $this->getTeamOrFail($teamId);
        if (!$team) {
            return redirect()->back()->withErrors(['team' => 'Team not found.']);
        }

        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);
        $memberToKick = $this->getUserTeamMapping($teamId, $memberId);

        if (!$teamMapping || !$memberToKick) {
            return redirect()->back()->withErrors(['member' => 'Invalid member or insufficient permissions.']);
        }

        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        if ($teamMapping->role_id !== $ownerRoleId) {
            return redirect()->back()->withErrors(['permission' => 'Only the team owner can kick members.']);
        }

        if ($memberToKick->role_id === $ownerRoleId) {
            return redirect()->back()->withErrors(['member' => 'You cannot kick the team owner.']);
        }

        $memberToKick->delete();

        return redirect()->back()->with('status', 'Member successfully kicked from the team.');
    }

    /**
     * Accept a new member's application.
     */
    public function acceptNewMember(Request $request, $teamId, $memberId)
    {
        $team = $this->getTeamOrFail($teamId);
        if (!$team) {
            return redirect()->back()->withErrors(['team' => 'Team not found.']);
        }

        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);
        $applicant = $this->getUserTeamMapping($teamId, $memberId);

        if (!$teamMapping || !$applicant) {
            return redirect()->back()->withErrors(['application' => 'Invalid application or insufficient permissions.']);
        }

        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        if ($teamMapping->role_id !== $ownerRoleId) {
            return redirect()->back()->withErrors(['permission' => 'Only the team owner can accept applications.']);
        }

        $defaultMemberRoleId = TeamRole::where('name', 'Member')->first()->id;
        $applicant->role_id = $defaultMemberRoleId;
        $applicant->joined_at = now();
        $applicant->save();

        return redirect()->back()->with('status', 'Member application accepted successfully.');
    }

    /**
     * Decline a new member's application.
     */
    public function declineNewMember(Request $request, $teamId, $memberId)
    {
        $team = $this->getTeamOrFail($teamId);
        if (!$team) {
            return redirect()->back()->withErrors(['team' => 'Team not found.']);
        }

        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);
        $applicant = $this->getUserTeamMapping($teamId, $memberId);

        if (!$teamMapping || !$applicant) {
            return redirect()->back()->withErrors(['application' => 'Invalid application or insufficient permissions.']);
        }

        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        if ($teamMapping->role_id !== $ownerRoleId) {
            return redirect()->back()->withErrors(['permission' => 'Only the team owner can decline applications.']);
        }

        $applicant->delete();

        return redirect()->back()->with('status', 'Member application declined successfully.');
    }

    /**
     * Delete a team.
     */
    public function destroy(Request $request, $teamId)
    {
        $team = $this->getTeamOrFail($teamId);

        if (!$team) {
            return redirect()->back()->withErrors(['team' => 'Team not found.']);
        }

        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);
        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        if (!$teamMapping || $teamMapping->role_id !== $ownerRoleId) {
            return redirect()->back()->withErrors(['permission' => 'Only the team owner can delete the team.']);
        }

        DB::transaction(function () use ($team) {
            TeamMapping::where('teams_id', $team->id)->delete();

            if ($team->is_gdrive_icon && $team->icon) {
                $fileId = $this->driveService->getFileIdFromUrl($team->icon);
                $this->driveService->deleteFile($fileId);
            }

            $team->delete();
        });

        return redirect()->route('dashboard')->with('status', 'Team deleted successfully.');
    }

    /**
     * Update an existing team.
     */
    public function update(Request $request, $teamId)
    {
        $team = $this->getTeamOrFail($teamId);

        if (!$team) {
            return redirect()->back()->withErrors(['team' => 'Team not found.']);
        }

        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);
        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        if (!$teamMapping || $teamMapping->role_id !== $ownerRoleId) {
            return redirect()->back()->withErrors(['permission' => 'Only the team owner can edit the team.']);
        }

        $request->validate($this->teamValidationRules(), $this->teamValidationMessages());

        if (Team::where('name', $request->name)->where('id', '!=', $team->id)->exists()) {
            return redirect()->back()->withErrors(['name' => 'This team name is already in use. Please choose another name.']);
        }

        $team->name = $request->name;
        $team->description = $request->description;

        if ($request->hasFile('icon')) {
            if ($team->is_gdrive_icon && $team->icon) {
                $fileId = $this->driveService->getFileIdFromUrl($team->icon);
                $this->driveService->deleteFile($fileId);
            }

            $this->uploadTeamIcon($team, $request->file('icon'));
        }

        $team->save();

        return redirect()->back()->with('status', 'Team updated successfully.');
    }

    /**
     * Delete a team's icon from Google Drive.
     */
    private function deleteTeamIcon(Team $team)
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

    /**
     * Handle the deletion of a team's icon.
     */
    public function destroyIcon(Request $request, $teamId)
    {
        $team = $this->getTeamOrFail($teamId);

        if (!$team) {
            return redirect()->back()->withErrors(['team' => 'Team not found.']);
        }

        $teamMapping = $this->getUserTeamMapping($teamId, $request->user()->id);
        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        if (!$teamMapping || $teamMapping->role_id !== $ownerRoleId) {
            return redirect()->back()->withErrors(['permission' => 'Only the team owner can delete the team icon.']);
        }

        $this->deleteTeamIcon($team);

        return redirect()->back()->with('status', 'Team icon deleted successfully.');
    }

    /**
     * Display the dashboard with a list of teams the authenticated user has joined.
     */
    public function dashboard(Request $request)
    {
        $userId = $request->user()->id;

        $teams = Team::select('teams.id', 'teams.name', 'teams.code', 'teams.icon', 'teams.description')
            ->join('teams_mapping', 'teams.id', '=', 'teams_mapping.teams_id')
            ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
            ->where('teams_mapping.member_id', $userId)
            ->whereIn('teams_roles.name', ['Owner', 'Member'])
            ->get()
            ->map(function ($team) use ($userId) {
                $members = DB::table('teams_mapping')
                    ->join('users', 'teams_mapping.member_id', '=', 'users.id')
                    ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
                    ->select(
                        'users.id',
                        'users.name',
                        'users.email',
                        'users.avatar',
                        'teams_roles.name as role'
                    )
                    ->where('teams_mapping.teams_id', $team->id)
                    ->where('teams_roles.name', '!=', 'Guest')
                    ->orderByRaw("
                        CASE 
                            WHEN users.id = ? THEN 0 
                            WHEN teams_roles.name = 'Owner' THEN 1 
                            ELSE 2 
                        END
                    ", [$userId])
                    ->orderBy('users.name')
                    ->get();

                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'code' => $team->code,
                    'icon' => $team->icon,
                    'description' => $team->description,
                    'members' => $members,
                ];
            });


        return Inertia::render('Dashboard/User/ListTeam', [
            'teams' => $teams,
        ]);
    }
}
