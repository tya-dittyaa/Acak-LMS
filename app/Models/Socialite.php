<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socialite extends Model
{
  use HasFactory, HasUuids;

  protected $table = 'socialite';

  protected $fillable = [
    'user_id',
    'provider_id',
    'provider_name',
    'provider_token',
    'provider_refresh_token',
  ];

  /**
   * Get the user associated with this socialite account.
   */
  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
}
