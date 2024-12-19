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

    public function store(Request $request){
        $request->validate([
            'Task' => 'required|string|max:255',
            'CreatedAt' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'MemberId' => 'required|integer',
            'UpdatedAt' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'PriorityId' => 'required|integer',
            'ActionId' => 'required|integer',
            'Deadline' => 'required|date_format:Y-m-d',
            'TeamId' => 'required|integer',
        ]);

        $task = new Tasks();
        $task->Task = $request->Task;
        $task->CreatedAt = $request->CreatedAt;
        $task->MemberId = $request->MemberId;
        $task->UpdatedAt = $request->UpdatedAt;
        $task->PriorityId = $request->PriorityId;
        $task->ActionId = $request->ActionId;
        $task->Deadline = $request->Deadline;
        $task->TeamId = $request->TeamId;
        $task->save();

        return redirect()->back()->with('status', 'Task created successfully.');
    }

    public function update(Request $request, Tasks $task, int $actionId)
    {
        \Log::info('Request data:', $request->all());
        try {
            $task = Tasks::findOrFail($task->TaskId);

            $task->update([
                'ActionId' => $actionId,
                'UpdatedAt' => now(),
            ]);
            \Log::info('Task after update:', $task->toArray());

            return redirect()->back()->with('success', 'Task updated successfully!');
        } catch (\Exception $e) {
            \Log::error('Task update failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update task.');
        }
    }

}
