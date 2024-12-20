<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasUuids;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the socialite accounts associated with the user.
     */
    public function socialites()
    {
        return $this->hasMany(Socialite::class, 'user_id', 'id');
    }

    /**
     * Get the teams the user is part of.
     */
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'teams_mapping', 'user_id', 'team_id')
            ->withPivot('role_id', 'joined_at')
            ->withTimestamps();
    }

    /**
     * Get the tasks assigned to the user.
     */
    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_assignees', 'user_id', 'task_id')
            ->using(TaskAssignee::class)
            ->withTimestamps();
    }
}
