import React, { useState } from "react";
import GaugeChart from "react-svg-gauge";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import MainLayout from "@/Layouts/Main/MainLayout";
import Link from "next/link";

// Define a Task interface
interface Task {
    name: string;
    completed: boolean;
}

const data = [
    {
        name: "Project 1",
        Budgeted: 400,
        Tracked: 353,
    },
    {
        name: "Project 2",
        Budgeted: 300,
        Tracked: 214,
    },
    {
        name: "Project 3",
        Budgeted: 450,
        Tracked: 400,
    },
    {
        name: "Project 4",
        Budgeted: 350,
        Tracked: 300,
    },
    {
        name: "Project 5",
        Budgeted: 420,
        Tracked: 380,
    },
    {
        name: "Project 6",
        Budgeted: 380,
        Tracked: 320,
    },
];

// Task List Component
const TaskList: React.FC<{
    tasks: Task[];
    onToggleComplete: (index: number) => void;
}> = ({ tasks, onToggleComplete }) => {
    return (
        <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">Task List</h2>
            <ul className="mt-4">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(index)}
                            className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span>{task.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function DashboardDetail() {
    const [tasks, setTasks] = useState<Task[]>([
        { name: "Task 1", completed: false },
        { name: "Task 2", completed: false },
        { name: "Task 3", completed: false },
        { name: "Task 4", completed: false },
    ]);

    const handleToggleComplete = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    return (
        <MainLayout title="Dashboard Show Team Participated">
            <div className="flex flex-col space-y-4">
                <div className="p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Projects</h2>
                        <select className="border rounded px-2 py-1">
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold">Tasks</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center">
                            <p className="text-lg font-semibold">353</p>
                            <p className="text-gray-500">Total</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">214</p>
                            <p className="text-gray-500">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">139</p>
                            <p className="text-gray-500">Incomplete</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">139</p>
                            <p className="text-gray-500">Overdue</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold">Time (Hours)</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center">
                            <p className="text-lg font-semibold">1,511.06</p>
                            <p className="text-gray-500">Billable</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">330.54</p>
                            <p className="text-gray-500">Nonbillable</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">1,727.93</p>
                            <p className="text-gray-500">Invoiced</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">113.67</p>
                            <p className="text-gray-500">Not Invoiced</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">
                        Budgeted vs. Tracked Hours by Project
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Budgeted" fill="#8884d8" />
                            <Bar dataKey="Tracked" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Task List Component */}
                <TaskList
                    tasks={tasks}
                    onToggleComplete={handleToggleComplete}
                />
            </div>
        </MainLayout>
    );
}
