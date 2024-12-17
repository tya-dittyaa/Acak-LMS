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

    private function generateTeamCode()
    {
        do {
            $code = $this->randomTeamCode();
        } while (Team::where('code', $code)->exists());

        return $code;
    }

    private function randomTeamCode(): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $length = 8;
        $code = '';

        for ($i = 0; $i < $length; $i++) {
            $code .= $characters[random_int(0, strlen($characters) - 1)];
        }

        return $code;
    }

    /*
     * Display the team dashboard.
     */
    public function show(Request $request, $teamId)
    {
        // Get the team
        $team = Team::find($teamId);

        // Check if the team exists
        if (!$team) {
            return Inertia::render('Error', ['status' => 404]);
        }

        // Check if the user is a member of the team and not a guest
        $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;
        $teamMapping = TeamMapping::where('teams_id', $teamId)
            ->where('member_id', $request->user()->id)
            ->where('role_id', '!=', $guestRoleId)
            ->first();

        if (!$teamMapping) {
            return Inertia::render('Error', ['status' => 403]);
        }

        // Get the team roles
        $teamRoles = TeamRole::all();

        // Get the team members with the owner on top and others sorted by join time
        $teamMembers = DB::table('team_mappings')
            ->join('users', 'team_mappings.member_id', '=', 'users.id')
            ->join('team_roles', 'team_mappings.role_id', '=', 'team_roles.id')
            ->select('team_mappings.*', 'users.name as member_name', 'team_roles.name as role_name')
            ->where('team_mappings.teams_id', $teamId)
            ->orderByRaw("
                CASE 
                    WHEN team_roles.name = 'Owner' THEN 0 
                    ELSE 1 
                END, 
                team_mappings.joined_at ASC
            ")
            ->get();

        // Get the team applications
        $teamApplications = DB::table('team_mappings')
            ->join('users', 'team_mappings.member_id', '=', 'users.id')
            ->join('team_roles', 'team_mappings.role_id', '=', 'team_roles.id')
            ->select('team_mappings.*', 'users.name as member_name', 'team_roles.name as role_name')
            ->where('team_mappings.teams_id', $teamId)
            ->where('team_mappings.role_id', $guestRoleId)
            ->get();

        // Get the team icon
        $teamIcon = $team->icon;

        // Get the team owner
        $teamOwner = DB::table('team_mappings')
            ->join('users', 'team_mappings.member_id', '=', 'users.id')
            ->select('team_mappings.*', 'users.name as member_name')
            ->where('team_mappings.teams_id', $teamId)
            ->where('team_mappings.role_id', TeamRole::where('name', 'Owner')->first()->id)
            ->first();

        return inertia('TeamDashboard', [
            'team' => $team,
            'teamRoles' => $teamRoles,
            'teamMembers' => $teamMembers,
            'teamApplications' => $teamApplications,
            'teamIcon' => $teamIcon,
            'teamOwner' => $teamOwner,
        ]);
    }

    /*
     * Create a new team.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'description' => ['nullable', 'string', 'min:3', 'max:255'],
            'icon' => ['nullable', 'file', 'image', 'max:2048', 'mimes:png,jpg,jpeg'],
        ], [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.min' => 'The name must be at least 3 characters.',
            'name.max' => 'The name must not be greater than 100 characters.',
            'description.string' => 'The description must be a string.',
            'description.min' => 'The description must be at least 3 characters.',
            'description.max' => 'The description must not be greater than 255 characters.',
            'icon.file' => 'The icon must be a valid file.',
            'icon.image' => 'The icon must be an image.',
            'icon.max' => 'The icon must not be greater than 2MB.',
            'icon.mimes' => 'The icon must be a file of type: png, jpg, jpeg.',
        ]);

        // Check if the Team Name Exists Globally
        $checkGlobalTeamName = DB::table("teams")
            ->where("name", $request->name)
            ->exists();

        if ($checkGlobalTeamName) {
            return redirect()->back()->withErrors(['name' => 'This team name is already in use. Please choose another name.']);
        }

        // Create Team
        $team = new Team();
        $team->name = $request->name;
        $team->description = $request->description;
        $team->code = $this->generateTeamCode();
        $team->save();

        // Get Owner Role ID
        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        // Create Team Mapping
        $teamMapping = new TeamMapping();
        $teamMapping->teams_id = $team->id;
        $teamMapping->member_id = $request->user()->id;
        $teamMapping->role_id = $ownerRoleId;
        $teamMapping->joined_at = now();
        $teamMapping->save();

        // Upload Team Icon
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $folderId = $this->driveService->getTeamIconFolderId();

            $extension = $icon->getClientOriginalExtension();
            $fileName = "{$team->id}_" . time() . ".{$extension}";

            $result = $this->driveService->uploadFile($fileName, $icon, $folderId);

            $fileId = $result->id;
            $imageUrl = $this->driveService->getImageLink($fileId);

            $team->icon = $imageUrl;
            $team->is_gdrive_icon = true;
            $team->save();
        }

        // Redirect back with success message
        return redirect()->back()->with('status', 'Team created successfully.');
    }

    /*
    * Update the team details.
    */
    public function join(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'team_code' => ['required', 'string', 'min:8', 'max:8', 'exists:teams,code'],
        ], [
            'team_code.required' => 'The team code is required.',
            'team_code.string' => 'The team code must be a valid string.',
            'team_code.min' => 'The team code must be exactly 8 characters.',
            'team_code.max' => 'The team code must be exactly 8 characters.',
            'team_code.exists' => 'No team found with the provided code.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Check if the team exists
        $team = Team::where('code', $request->team_code)->first();

        if (!$team) {
            return redirect()->back()->withErrors(['team_code' => 'No team found with the provided code.']);
        }

        // Check if the user is already assigned a role other than 'Guest' in the team
        $existingRole = TeamMapping::where('teams_id', $team->id)
            ->where('member_id', $request->user()->id)
            ->whereNotIn('role_id', [
                TeamRole::where('name', 'Guest')->first()->id, // Exclude Guest role
            ])
            ->exists();

        if ($existingRole) {
            return redirect()->back()->withErrors(['team_code' => 'You have already joined the team.']);
        }

        // Check if the user has already applied with the 'Guest' role
        $existingApplication = TeamMapping::where('teams_id', $team->id)
            ->where('member_id', $request->user()->id)
            ->where('role_id', TeamRole::where('name', 'Guest')->first()->id)
            ->first();

        if ($existingApplication) {
            return redirect()->back()->withErrors(['team_code' => 'You have already applied to this team, please wait for the team owner to review your application.']);
        }

        // Assign the Guest role to the user when they apply
        $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;

        // Create the team mapping (apply to the team)
        $teamMapping = new TeamMapping();
        $teamMapping->teams_id = $team->id;
        $teamMapping->member_id = $request->user()->id;
        $teamMapping->role_id = $guestRoleId; // Assign Guest role
        $teamMapping->save();

        // Respond with success message
        return redirect()->back()->with('status', 'Your application to join the team has been successfully sent. The team owner will review it.');
    }
}
