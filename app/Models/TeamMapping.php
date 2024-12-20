<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeamMapping extends Model
{
  use HasFactory, HasUuids;

  protected $table = 'teams_mapping';

  protected $fillable = [
    'team_id',
    'user_id',
    'role_id',
    'joined_at',
  ];

  /**
   * Get the team this mapping belongs to.
   */
  public function team()
  {
    return $this->belongsTo(Team::class, 'team_id');
  }

  /**
   * Get the user (member) in this mapping.
   */
  public function member()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  /**
   * Get the role assigned in this mapping.
   */
  public function role()
  {
    return $this->belongsTo(TeamRole::class, 'role_id');
  }
}
