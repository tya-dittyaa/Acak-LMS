<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Team extends Model
{
  use HasFactory, HasUuids;

  protected $table = 'teams';

  protected $fillable = [
    'name',
    'description',
    'icon',
    'is_gdrive_icon',
  ];

  /**
   * Get all team members (relationships to TeamMapping).
   */
  public function members()
  {
    return $this->hasMany(TeamMapping::class, 'team_id');
  }

  /**
   * Get all tasks associated with the team.
   */
  public function tasks()
  {
    return $this->hasMany(Task::class, 'team_id');
  }
}
