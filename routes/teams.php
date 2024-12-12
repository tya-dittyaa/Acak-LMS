<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Create a new team
Route::post('/teams', [
  TeamController::class,
  'store'
])->middleware(['auth', 'verified'])->name('teams.store');
