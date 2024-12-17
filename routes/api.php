<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::post('/api/teams', [
  TeamController::class,
  'store'
])->middleware(['auth', 'verified'])->name('api.teams.store');

Route::post('/api/teams/join', [
  TeamController::class,
  'join'
])->middleware(['auth', 'verified'])->name('api.teams.join');
