<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/teams/{teamId}', [
  TeamController::class,
  'show'
])->middleware(['auth', 'verified'])->name('teams.show');
