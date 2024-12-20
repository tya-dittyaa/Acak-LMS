<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
  Route::get('/', [TeamController::class, 'dashboard'])->name('dashboard');

  Route::prefix('teams/{teamId}')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/details', [TeamController::class, 'show'])->name('teams.show');
  });
});
