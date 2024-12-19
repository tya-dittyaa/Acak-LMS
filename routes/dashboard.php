<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', [
  TeamController::class,
  'dashboard'
])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/teams/{teamId}/details', [
  TeamController::class,
  'show'
])->middleware(['auth', 'verified'])->name('teams.show');
