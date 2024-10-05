import React, { useState } from "react";
import MainLayout from "@/Layouts/Main/MainLayout";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface Task {
    id: number;
    description: string;
    deadline: Date;
}

export default function CalendarFunc() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    const addTask = () => {
        if (date && newTask) {
            const newTaskObj = {
                id: tasks.length + 1,
                description: newTask,
                deadline: date,
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask("");
        }
    };

    const select = tasks.filter(
        (task) => task.deadline.toDateString() === date?.toDateString()
    );

    const hasTaskOnDate = (day: Date) => {
        return tasks.some(
            (task) => task.deadline.toDateString() === day.toDateString()
        );
    };

    return (
        <MainLayout title="Task Reminder Calendar">
            <div className="w-full flex flex-col items-center justify-center">
                <Calendar
                    value={date}
                    onClickDay={setDate}
                    tileContent={({ date, view }) =>
                        view === "month" && hasTaskOnDate(date) ? (
                            <div className="flex justify-center items-center mt-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                        ) : null
                    }
                    className="w-full max-w-lg shadow-lg rounded-lg p-4 bg-white"
                />

                <div className="mt-5 w-full max-w-lg flex space-x-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter task description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={addTask}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Add Task
                    </button>
                </div>

                <div className="mt-6 w-full max-w-lg">
                    <h2 className="text-lg font-semibold mb-3">
                        Tasks for {date?.toDateString()}
                    </h2>
                    {select.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {select.map((task) => (
                                <li key={task.id}>{task.description}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks for this date.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
