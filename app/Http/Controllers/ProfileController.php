<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Services\DriveService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected $driveService;

    public function __construct(DriveService $driveService)
    {
        $this->driveService = $driveService;
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'passwordAvailable' => $request->user()->password !== null,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            DB::table('socialite')->where('user_id', $request->user()->id)->delete();
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Delete socialite records
        DB::table('socialite')->where('user_id', $user->id)->delete();

        // Delete user's avatar
        if ($user->is_gdrive_avatar) {
            $fileId = $this->driveService->getFileIdFromUrl($user->avatar);
            if ($fileId) {
                $this->driveService->deleteFile($fileId);
            }
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Update the user's profile avatar.
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png',
                'max:2048',
                'image',
            ],
        ], [
            'avatar.required' => 'The avatar field is required.',
            'avatar.file' => 'The avatar must be a valid file.',
            'avatar.mimes' => 'The avatar must be a file of type: jpg, jpeg, png.',
            'avatar.max' => 'The avatar must not be greater than 2MB.',
            'avatar.image' => 'The avatar must be an image.',
        ]);

        $user = $request->user();

        if ($user->is_gdrive_avatar) {
            $fileId = $this->driveService->getFileIdFromUrl($user->avatar);
            if ($fileId) {
                $this->driveService->deleteFile($fileId);
            }
        }

        $file = $request->file('avatar');
        $folderId = $this->driveService->getAvatarFolderId();

        $extension = $file->getClientOriginalExtension();
        $fileName = "{$user->id}_" . time() . ".{$extension}";

        $result = $this->driveService->uploadFile($fileName, $file, $folderId);

        $fileId = $result->id;
        $imageUrl = $this->driveService->getImageLink($fileId);

        $user->avatar = $imageUrl;
        $user->is_gdrive_avatar = true;
        $user->save();

        return Redirect::back()->with('status', 'Avatar uploaded successfully.');
    }

    /**
     * Delete the user's profile avatar.
     */
    public function deleteAvatar(Request $request)
    {
        $user = $request->user();

        if ($user->is_gdrive_avatar) {
            $fileId = $this->driveService->getFileIdFromUrl($user->avatar);
            if ($fileId) {
                $this->driveService->deleteFile($fileId);
            }
        }

        $user->avatar = null;
        $user->is_gdrive_avatar = false;
        $user->save();

        return Redirect::back()->with('status', 'Avatar deleted successfully.');
    }
}
