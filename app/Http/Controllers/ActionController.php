<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actions;

class ActionController extends Controller
{
    public function index()
    {
        $actions = Actions::all();

        return response()->json($actions);
    }
}
