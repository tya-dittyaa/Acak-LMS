<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Socialite as SocialiteModel;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
  public function redirect($provider)
  {
    return Socialite::driver($provider)->redirect();
  }

  public function callback($provider)
  {
    try {
      $socialUser = Socialite::driver($provider)->user();

      $authUser = $this->store($socialUser, $provider);
      Auth::login($authUser);

      return redirect()->route('dashboard');
    } catch (Exception $e) {
      return redirect()->route('login')->with('error', 'Failed to authenticate using ' . ucfirst($provider) . '. Please try again.');
    }
  }


  private function store($socialUser, $provider)
  {
    $socialAccount = SocialiteModel::where('provider_id', $socialUser->getId())
      ->where('provider_name', $provider)
      ->first();

    if (!$socialAccount) {
      $user = User::where('email', $socialUser->getEmail())->first();

      if (!$user) {
        $user = User::create([
          'name' => $socialUser->getName() ?? $socialUser->getNickname(),
          'email' => $socialUser->getEmail(),
          'avatar' => $socialUser->getAvatar(),
        ]);

        event(new Registered($user));
        Auth::login($user);
      } else {
        $this->updateAvatarIfNeeded($user, $socialUser->getAvatar());
      }

      $user->socialite()->create([
        'provider_id' => $socialUser->getId(),
        'provider_name' => $provider,
        'provider_token' => $socialUser->token,
        'provider_refresh_token' => $socialUser->refreshToken,
      ]);

      return $user;
    }

    $user = $socialAccount->user;
    $this->updateAvatarIfNeeded($user, $socialUser->getAvatar());

    return $user;
  }

  private function updateAvatarIfNeeded(User $user, ?string $newAvatar)
  {
    if ($user->avatar === null) {
      $user->update(['avatar' => $newAvatar]);
    }
  }
}
