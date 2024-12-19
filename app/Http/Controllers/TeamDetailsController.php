<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TeamDetails;

class TeamDetailsController extends Controller
{
    public function index()
    {
        $tasks = TeamDetails::with(['member', 'team'])->get();

        return response()->json($tasks);
    }
}
