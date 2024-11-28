<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Priority;

class PriorityController extends Controller
{
    public function index()
    {
        $priority = Priority::all();

        return response()->json($priority);
    }
}
