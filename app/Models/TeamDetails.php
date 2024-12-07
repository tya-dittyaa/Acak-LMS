<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamDetails extends Model
{
    use HasFactory;
    protected $table = 'teamdetails';
    public $timestamps = true;
    public $fillable = [
        'MemberId',
        'TeamId'
    ];
    public function team()
    {
        return $this->belongsTo(Team::class, 'TeamId', 'TeamId');
    }

    public function member()
    {
        return $this->belongsTo(Members::class, 'MemberId', 'MemberId');
    }

    public function membersTask(){
        return $this->hasMany(Tasks::class, 'MemberId', 'MemberId');
    }

    public function teamTask(){
        return $this->hasMany(Tasks::class, 'MemberId', 'MemberId');
    }
}
