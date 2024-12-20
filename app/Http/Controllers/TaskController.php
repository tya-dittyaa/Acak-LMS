<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskAssignee;
use App\Models\TeamRole;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

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
      ->leftJoin('task_assignees', 'tasks.id', '=', 'task_assignees.task_id')
      ->leftJoin('teams_mapping', 'task_assignees.user_id', '=', 'teams_mapping.user_id')
      ->leftJoin('teams_roles', 'teams_mapping.role_id', '=', 'teams_roles.id')
      ->where('tasks.team_id', $teamId)
      ->where(function ($query) {
        $query->whereNull('teams_roles.name')
          ->orWhere('teams_roles.name', '!=', 'Guest');
      })
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
            'teams_roles.name as role'
          )
          ->where('task_assignees.task_id', $task->id)
          ->where('teams_roles.name', '!=', 'Guest')
          ->get();

        return [
          'id' => $task->id,
          'title' => $task->title,
          'description' => $task->description,
          'priority' => $task->priority,
          'assigned_to' => $assignees->isEmpty() ? [] : $assignees,
          'due_date' => $task->due_date,
          'status' => $task->status,
        ];
      });

    $teamMembers = $this->teamService->getTeamMembersWithDetails($teamId);

    return Inertia::render('Teams/Tasks/TaskLayout', [
      'team' => $team,
      'tasks' => $tasks,
      'teamMembers' => $teamMembers,
    ]);
  }

  public function store(Request $request, $teamId)
  {
    $request->validate([
      'title' => 'required|string|min:5|max:100',
      'description' => 'required|string|min:5|max:255',
      'priority' => 'required|string|in:Low,Medium,High',
      'due_date' => 'required|date|after:today',
      'assigned_to' => 'array',
      'assigned_to.*' => 'exists:users,id',
    ], [
      'title.required' => 'The task title is required.',
      'title.string' => 'The task title must be a valid string.',
      'title.min' => 'The task title must be at least 5 characters long.',
      'title.max' => 'The task title should not exceed 100 characters.',
      'description.required' => 'The task description is required.',
      'description.string' => 'The task description must be a valid string.',
      'description.min' => 'The task description must be at least 5 characters long.',
      'description.max' => 'The task description should not exceed 255 characters.',
      'priority.required' => 'The priority field is required.',
      'priority.in' => 'The priority must be one of the following values: Low, Medium, High.',
      'due_date.required' => 'The due date is required.',
      'due_date.date' => 'The due date must be a valid date.',
      'due_date.after' => 'The due date must be a date after today.',
      'assigned_to.array' => 'The assigned_to field must be an array of user IDs.',
      'assigned_to.*.exists' => 'One or more of the assigned users do not exist.',
    ]);

    $team = $this->teamService->getTeamOrFail($teamId);
    if (!$team) {
      return Inertia::render('Error', ['status' => 404]);
    }

    $guestRoleId = TeamRole::where('name', 'Guest')->first()->id;
    $teamMapping = $this->teamService->getUserTeamMapping($teamId, $request->user()->id);
    if (!$teamMapping || $teamMapping->role_id === $guestRoleId) {
      return Inertia::render('Error', ['status' => 403]);
    }

    try {
      DB::beginTransaction();

      $task = Task::create([
        'title' => $request->title,
        'description' => $request->description,
        'priority' => $request->priority,
        'status' => $request->status ?? 'Open',
        'due_date' => $request->due_date,
        'team_id' => $teamId,
      ]);

      if (!empty($request->assigned_to)) {
        foreach ($request->assigned_to as $userId) {
          TaskAssignee::create([
            'task_id' => $task->id,
            'user_id' => $userId,
          ]);
        }
      }

      DB::commit();
      return redirect()->back()->with('success', 'Task created successfully.');
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error('Task creation failed: ', ['error' => $e->getMessage()]);
      return redirect()->back()->with('error', 'An error occurred while creating the task.');
    }
  }
}
