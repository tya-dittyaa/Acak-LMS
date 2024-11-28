<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $table = 'tasks';
    protected $primaryKey = 'TaskId';
    public $timestamps = true;
    public function action()
    {
        return $this->belongsTo(Actions::class, 'ActionId', 'ActionId');
    }

    public function member()
    {
        return $this->belongsTo(Members::class, 'MemberId', 'MemberId');
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'PriorityId', 'PriorityId');
    }
}
