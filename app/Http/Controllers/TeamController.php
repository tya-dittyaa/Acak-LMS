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

    // Create a new team
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'file', 'image', 'max:2048', 'mimes:png,jpg,jpeg'],
        ], [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name must not be greater than 100 characters.',
            'description.string' => 'The description must be a string.',
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

    // Join a team
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
