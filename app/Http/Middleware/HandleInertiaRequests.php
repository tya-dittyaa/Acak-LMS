<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Http\Controllers\TeamController;
use App\Services\TeamService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';
    protected $teamService;

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $teams = $user ? $this->teamService->getTeamsForUser($user->id) : null;

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'teams' => $teams,
            ],
            'currentPath' => $request->path(),
            'status' => fn() => $request->session()->get('status'),
        ];
    }
}
