<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeamDetailsController extends Controller
{
    public function index()
    {
        $tasks = TeamDetails::with(['member', 'team'])->get();

        return response()->json($tasks);
    }
}
