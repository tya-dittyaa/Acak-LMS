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
    protected $fillable = [
        'MemberId',
        'MemberName',
        'Email',
        'Password',
        'ProfilePicture'
    ];
    public function membersDetails(){
        return $this->hasMany(TeamDetails::class, 'MemberId', 'MemberId');
    }
}
