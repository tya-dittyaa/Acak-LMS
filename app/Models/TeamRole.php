<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeamRole extends Model
{
  use HasFactory, HasUuids;

  protected $table = 'teams_roles';

  protected $fillable = ['name'];

  /**
   * Get all team mappings with this role.
   */
  public function teamMappings()
  {
    return $this->hasMany(TeamMapping::class, 'role_id');
  }
}
