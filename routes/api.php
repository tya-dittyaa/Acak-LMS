<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::post('/api/teams', [
  TeamController::class,
  'store'
])->middleware(['auth', 'verified'])->name('api.teams.store');

Route::post('/api/teams/apply', [
  TeamController::class,
  'apply'
])->middleware(['auth', 'verified'])->name('api.teams.apply');
