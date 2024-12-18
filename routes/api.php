<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api/teams')->middleware(['auth', 'verified'])->group(function () {
  Route::post('/', [TeamController::class, 'store'])->name('api.teams.store');
  Route::post('/apply', [TeamController::class, 'apply'])->name('api.teams.apply');
  Route::delete('/{teamId}', [TeamController::class, 'destroy'])->name('api.teams.destroy');
  Route::patch('/{teamId}', [TeamController::class, 'update'])->name('api.teams.update');
  Route::delete('/{teamId}/kick/{memberId}', [TeamController::class, 'kickMember'])->name('api.teams.kick');
  Route::patch('/{teamId}/accept/{memberId}', [TeamController::class, 'acceptNewMember'])->name('api.teams.accept');
  Route::patch('/{teamId}/decline/{memberId}', [TeamController::class, 'declineNewMember'])->name('api.teams.decline');
});
