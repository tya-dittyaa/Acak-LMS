<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Socialite as SocialiteModel;
use App\Models\User;
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
        $socialUser = Socialite::driver($provider)->user();

        $authUser = $this->store($socialUser, $provider);

        Auth::login($authUser);

        return redirect()->route('dashboard');
    }

    private function store($socialUser, $provider)
    {
        $socialAccount = SocialiteModel::where('provider_id', $socialUser->getId())
            ->where('provider_name', $provider)
            ->first();

        if (!$socialAccount) {
            $user = User::where('email', $socialUser->getEmail())->first();

            if (!$user) {
                $user = User::updateOrCreate([
                    'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                    'email' => $socialUser->getEmail(),
                    'password' => bcrypt($socialUser->getId()),
                ]);
            }

            $user->socialite()->create([
                'provider_id' => $socialUser->getId(),
                'provider_name' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken,
            ]);

            return $user;
        }

        return $socialAccount->user;
    }
}
