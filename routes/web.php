<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamDetailsController;

Route::get("/", function () {
    return Inertia::render("Welcome", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
    ]);
});

Route::get('/testing', function () {
    return Inertia::render('Testing');
});

Route::get('/listTasks', function () {
    return Inertia::render('ListTasks');
});

Route::get('/listProjects', function () {
    return Inertia::render('ListProjects');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
    Route::delete('/profile/avatar', [ProfileController::class, 'deleteAvatar'])->name('profile.avatar.delete');
});

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
});

Route::get('/actions',[App\Http\Controllers\ActionController::class, 'index']);
Route::get('/tasks',[App\Http\Controllers\TasksController::class, 'index']);
Route::get('/members',[App\Http\Controllers\MemberController::class, 'index']);
Route::get('/teams',[App\Http\Controllers\TeamController::class, 'index']);
Route::get('/teamDetails',[App\Http\Controllers\TeamDetailsController::class, 'index']);
Route::get('/priority',[App\Http\Controllers\PriorityController::class, 'index']);
Route::post('/tasks', [App\Http\Controllers\TasksController::class, 'store'])->name('tasks.store');
Route::patch('/tasks/{task}/{actionId}', [App\Http\Controllers\TasksController::class, 'update'])->name('tasks.update');

require __DIR__ . '/auth.php';
