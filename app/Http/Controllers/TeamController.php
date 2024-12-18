<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamMapping;
use App\Models\TeamRole;
use App\Services\DriveService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class TeamController extends Controller
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

        $teamRoles = TeamRole::all();
        $teamMembers = $this->getTeamMembers($teamId);
        $teamApplications = $this->getTeamApplications($teamId, $guestRoleId);
        $teamOwner = $this->getTeamOwner($teamId);

        return inertia('TeamInfoDetails', [
            'team' => $team,
            'teamRoles' => $teamRoles,
            'teamMembers' => $teamMembers,
            'teamApplications' => $teamApplications,
            'teamIcon' => $team->icon,
            'teamOwner' => $teamOwner,
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

        return redirect()->back()->with('status', 'Team created successfully.');
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

    private function getTeamMembers($teamId)
    {
        return DB::table('team_mappings')
            ->join('users', 'team_mappings.member_id', '=', 'users.id')
            ->join('team_roles', 'team_mappings.role_id', '=', 'team_roles.id')
            ->where('team_mappings.teams_id', $teamId)
            ->orderByRaw("
                CASE 
                    WHEN team_roles.name = 'Owner' THEN 0 
                    ELSE 1 
                END, 
                team_mappings.joined_at ASC
            ")
            ->get();
    }

    private function getTeamApplications($teamId, $guestRoleId)
    {
        return DB::table('team_mappings')
            ->join('users', 'team_mappings.member_id', '=', 'users.id')
            ->where('team_mappings.teams_id', $teamId)
            ->where('team_mappings.role_id', $guestRoleId)
            ->get();
    }

    private function getTeamOwner($teamId)
    {
        return DB::table('team_mappings')
            ->join('users', 'team_mappings.member_id', '=', 'users.id')
            ->where('team_mappings.teams_id', $teamId)
            ->where('team_mappings.role_id', TeamRole::where('name', 'Owner')->first()->id)
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
}
