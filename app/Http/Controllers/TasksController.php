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

    public function store(){
        $validatedData = $request->validate([
            'Task' => 'required|string|max:255',
            'CreatedAt' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'MemberId' => 'required|integer',
            'UpdatedAt' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'PriorityId' => 'required|integer',
            'ActionId' => 'required|integer',
            'Deadline' => 'required|date_format:Y-m-d',
            'TeamId' => 'required|integer',
        ]);

        $task = Task::create([
            'Task' => $validatedData['Task'],
            'CreatedAt' => $validatedData['CreatedAt'],
            'MemberId' => (int)$validatedData['MemberId'],
            'UpdatedAt' => $validatedData['UpdatedAt'],
            'PriorityId' => (int)$validatedData['PriorityId'],
            'ActionId' => (int)$validatedData['ActionId'],
            'Deadline' => $validatedData['Deadline'],
            'TeamId' => (int)$validatedData['TeamId'],
        ]);

        return response()->json($task, 201);
    }

    public function updateAction($taskId, Request $request)
    {
        try {
            $request->validate([
                'ActionId' => 'required|integer',
            ]);

            $task = Task::findOrFail($taskId);

            $task->action()->update(['ActionId' => $request->ActionId]);

            return response()->json(['Action' => $task->action->Action], 200);

        } catch (\Exception $e) {
            \Log::error('Error updating action: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
