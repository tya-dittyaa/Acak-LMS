<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PriorityController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/testing', function () {
    return Inertia::render('Testing');
});

Route::get('/listTasks', function () {
    return Inertia::render('ListTasks');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
});

Route::get('/actions',[App\Http\Controllers\ActionController::class, 'index']);
Route::get('/tasks',[App\Http\Controllers\TasksController::class, 'index']);

require __DIR__ . '/auth.php';
