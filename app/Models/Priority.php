<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    use HasFactory;
    protected $table = 'priority';
    protected $primaryKey = 'PriorityId';
    public $timestamps = false;
    public function priorityTask(){
        return $this->hasMany(Tasks::class);
    }
}
