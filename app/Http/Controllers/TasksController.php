<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;

class TasksController extends Controller
{
    public function index()
    {
        $tasks = Tasks::with(['member', 'priority', 'action', 'team'])->get();

        return response()->json($tasks);
    }
}
