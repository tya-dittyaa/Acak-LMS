<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::post('/teams', [
  TeamController::class,
  'store'
])->middleware(['auth', 'verified'])->name('teams.store');

Route::post('/teams/join', [
  TeamController::class,
  'join'
])->middleware(['auth', 'verified'])->name('teams.join');
