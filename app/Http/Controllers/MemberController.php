<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Members;

class MemberController extends Controller
{
    public function index()
    {
        $members = Members::all();

        return response()->json($members);
    }
}
