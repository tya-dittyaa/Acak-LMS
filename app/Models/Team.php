<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $table = 'team';
    protected $primaryKey = 'TeamId';
    public $timestamps = false;
    protected $fillable = [
        'TeamId',
        'Description',
        'DueDate'
    ];
    public function teamDetails(){
        return $this->hasMany(TeamDetails::class, 'MemberId', 'MemberId');
    }
}
