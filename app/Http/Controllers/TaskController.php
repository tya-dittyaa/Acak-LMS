<?php

namespace App\Http\Controllers;

use App\Models\TeamRole;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TaskController extends Controller
{
  protected $teamService;

  public function __construct(TeamService $teamService)
  {
    $this->teamService = $teamService;
  }

  public function index(Request $request, $teamId)
  {
    $team = $this->teamService->getTeamOrFail($teamId);

    if (!$team) {
      return Inertia::render('Error', ['status' => 404]);
    }

    $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;
    $teamMapping = $this->teamService->getUserTeamMapping($teamId, $request->user()->id);

    if (!$teamMapping || $teamMapping->role_id === $guestRoleId) {
      return Inertia::render('Error', ['status' => 403]);
    }

    $tasks = DB::table('tasks')
      ->select('tasks.id', 'tasks.title', 'tasks.description', 'tasks.priority', 'tasks.due_date', 'tasks.status', 'tasks.team_id')
      ->join('task_assignees', 'tasks.id', '=', 'task_assignees.task_id')
      ->join('teams_mapping', 'task_assignees.user_id', '=', 'teams_mapping.user_id')
      ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
      ->where('tasks.team_id', $teamId)
      ->where('teams_roles.name', '!=', 'Guest')
      ->get()
      ->map(function ($task) {
        $assignees = DB::table('task_assignees')
          ->join('users', 'task_assignees.user_id', '=', 'users.id')
          ->join('teams_mapping', 'task_assignees.user_id', '=', 'teams_mapping.user_id')
          ->join('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
          ->select(
            'users.id',
            'users.name',
            'users.email',
            'users.avatar',
            'teams_roles.name as role_name'
          )
          ->where('task_assignees.task_id', $task->id)
          ->where('teams_roles.name', '!=', 'Guest')
          ->get();

        return [
          'id' => $task->id,
          'name' => $task->title,
          'description' => $task->description,
          'priority' => $task->priority,
          'assigned_to' => $assignees,
          'due_date' => $task->due_date,
          'status' => $task->status,
        ];
      });

    return Inertia::render('Teams/Tasks/TaskLayout', [
      'tasks' => $tasks,
    ]);
  }
}
