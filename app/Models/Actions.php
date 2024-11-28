<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actions extends Model
{
    use HasFactory;
    protected $table = 'actions';
    protected $primaryKey = 'ActionId';
    public $timestamps = false;
    public function tasksAction(){
        return $this->hasMany(Tasks::class);
    }
}
