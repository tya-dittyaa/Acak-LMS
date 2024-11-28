<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    use HasFactory;
    protected $table = 'members';
    protected $primaryKey = 'MemberId';
    public $timestamps = false;
    public function membersTask(){
        return $this->hasMany(Tasks::class);
    }
}
