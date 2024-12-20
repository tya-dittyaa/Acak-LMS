<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
  Route::prefix('teams')->group(function () {
    Route::post('/', [TeamController::class, 'store'])->name('api.teams.store');
    Route::post('/apply', [TeamController::class, 'apply'])->name('api.teams.apply');
    Route::delete('/{teamId}', [TeamController::class, 'destroy'])->name('api.teams.destroy');
    Route::post('/{teamId}', [TeamController::class, 'update'])->name('api.teams.update');
    Route::delete('/{teamId}/icon', [TeamController::class, 'destroyIcon'])->name('api.teams.destroyIcon');
    Route::delete('/{teamId}/kick/{memberId}', [TeamController::class, 'kickMember'])->name('api.teams.kick');
    Route::patch('/{teamId}/accept/{memberId}', [TeamController::class, 'acceptNewMember'])->name('api.teams.accept');
    Route::patch('/{teamId}/decline/{memberId}', [TeamController::class, 'declineNewMember'])->name('api.teams.decline');
  });

  Route::prefix('tasks')->group(function () {
    Route::post('/', [TaskController::class, 'store'])->name('api.tasks.store');
    Route::delete('/{taskId}', [TaskController::class, 'destroy'])->name('api.tasks.destroy');
    Route::post('/{taskId}', [TaskController::class, 'update'])->name('api.tasks.update');
  });
});
