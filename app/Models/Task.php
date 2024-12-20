<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'priority',
        'due_date',
        'status',
        'team_id',
    ];

    /**
     * Get the team this task belongs to.
     */
    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    /**
     * Get the users assigned to this task.
     */
    public function assignees()
    {
        return $this->belongsToMany(User::class, 'task_assignees', 'task_id', 'member_id')
            ->withTimestamps();
    }
}
