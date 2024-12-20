<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TaskController extends Controller
{
  public function index()
  {
    return Inertia::render('Teams/Tasks/TaskLayout');
  }
}
