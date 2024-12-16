<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamMapping;
use App\Models\TeamRole;
use App\Services\DriveService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    protected $driveService;

    public function __construct(DriveService $driveService)
    {
        $this->driveService = $driveService;
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
        $team->save();

        // Get Owner Role ID
        $ownerRoleId = TeamRole::where('name', 'Owner')->first()->id;

        // Create Team Mapping
        $teamMapping = new TeamMapping();
        $teamMapping->teams_id = $team->id;
        $teamMapping->member_id = $request->user()->id;
        $teamMapping->role_id = $ownerRoleId;
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
}