import React, { useState } from "react";
import MainLayout from "@/Layouts/Main/MainLayout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Task {
    id: number;
    Task: string;
    Deadline: Date;
}

export default function DashboardDetail() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tasks = [
        {
            id: 1,
            Task: "Submit project report",
            Deadline: new Date("2024-12-03"),
        },
        {
            id: 2,
            Task: "Team meeting for sprint planning",
            Deadline: new Date("2024-12-05"),
        },
        {
            id: 3,
            Task: "Prepare presentation slides",
            Deadline: new Date("2024-12-10"),
        },
        {
            id: 4,
            Task: "Test Task",
            Deadline: new Date("2024-12-10"),
        },
    ];

    const select = tasks.filter(
        (task) => task.Deadline.toDateString() === date?.toDateString()
    );

    const hasTaskOnDate = (day: Date) => {
        return tasks.some(
            (task) => task.Deadline.toDateString() === day.toDateString()
        );
    };

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const chartData = {
        labels: ["Task 1", "Task 2", "Task 3"],
        datasets: [
            {
                label: "Class Progress",
                data: [60, 50, 70],
                backgroundColor: "rgba(29, 78, 216, 0.5)",
                borderColor: "rgba(29, 78, 216, 1)",
                borderWidth: 1,
            },
            {
                label: "Your Progress",
                data: [80, 40, 100],
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        indexAxis: "y" as const,
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Class vs Your Progress",
            },
        },
        scales: {
            x: {
                max: 100,
                ticks: {
                    callback: (value: any) => `${value}%`,
                },
            },
        },
    };

    const [filter, setFilter] = useState<"all" | "completed" | "overdue">(
        "all"
    );

    const filteredTasks = tasks.filter((task) => {
        const today = new Date();
        if (filter === "completed") {
            return task.Deadline < today;
        }
        if (filter === "overdue") {
            return task.Deadline < today && task.id > 5;
        }
        return true;
    });

    const getBackgroundColor = () => {
        if (filter === "completed") return "bg-green-100";
        if (filter === "overdue") return "bg-red-100";
        return "bg-blue-100";
    };

    return (
        <MainLayout title="Dashboard">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Section: Task Summary & Progress */}
                <div className="lg:w-1/3 p-6 flex flex-col space-y-6">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src=""
                            alt="Ahihuheho"
                            className="w-32 h-32 mb-4 rounded-full shadow-lg bg-blue-300"
                        />
                        <div className="text-center text-blue-900 font-medium">
                            <p>Member 1</p>
                            <p>Member 2</p>
                            <p>Member 3</p>
                            <p>Member 4</p>
                        </div>
                    </div>
                    <div className="lg:w-full p-6 flex flex-col space-y-6">
                        <h3 className="text-blue-800 font-bold text-lg">
                            Task Overview
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div
                                className={`bg-blue-300 p-4 rounded-lg shadow text-center cursor-pointer ${
                                    filter === "all"
                                        ? "ring-4 ring-blue-500"
                                        : ""
                                }`}
                                onClick={() => setFilter("all")}
                            >
                                <h4 className="font-semibold">Total Tasks</h4>
                                <p className="text-2xl">15</p>
                            </div>
                            <div
                                className={`bg-green-400 p-4 rounded-lg shadow text-center cursor-pointer ${
                                    filter === "completed"
                                        ? "ring-4 ring-green-500"
                                        : ""
                                }`}
                                onClick={() => setFilter("completed")}
                            >
                                <h4 className="font-semibold">Completed</h4>
                                <p className="text-2xl">10</p>
                            </div>
                            <div
                                className={`bg-red-500 p-4 rounded-lg shadow text-center cursor-pointer ${
                                    filter === "overdue"
                                        ? "ring-4 ring-red-500"
                                        : ""
                                }`}
                                onClick={() => setFilter("overdue")}
                            >
                                <h4 className="font-semibold">Overdue</h4>
                                <p className="text-2xl">5</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-4 mt-6">
                            <h4 className="text-blue-800 font-semibold text-lg">
                                Progress
                            </h4>
                            <div className="flex items-center space-x-2">
                                <span className="w-1/3 text-blue-700 font-medium text-sm">
                                    Completed
                                </span>
                                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-400"
                                        style={{ width: "66%" }}
                                    ></div>
                                </div>
                                <span className="w-1/3 text-right text-sm text-blue-700">
                                    66%
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-1/3 text-blue-700 font-medium text-sm">
                                    Overdue
                                </span>
                                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-400"
                                        style={{ width: "33%" }}
                                    ></div>
                                </div>
                                <span className="w-1/3 text-right text-sm text-blue-700">
                                    33%
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-blue-800 font-semibold text-lg mb-4">
                                Filtered Tasks
                            </h4>
                            {filteredTasks.length > 0 ? (
                                <ul
                                    className={`space-y-4 p-4 rounded-lg ${getBackgroundColor()}`}
                                >
                                    {filteredTasks.map((task) => (
                                        <li
                                            key={task.id}
                                            className="p-4 rounded-lg shadow hover:bg-opacity-80 cursor-pointer"
                                        >
                                            <strong>{task.Task}</strong>
                                            <p className="text-sm text-gray-600">
                                                Deadline:{" "}
                                                {task.Deadline.toLocaleDateString(
                                                    "en-US"
                                                )}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-blue-700">
                                    No tasks available for the selected filter.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Center Section: Calendar */}
                <div className="lg:w-2/7 p-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">
                        Task Calendar
                    </h3>
                    <div className="flex flex-col lg: w-full">
                        <style>{`
                            .calendar-custom {
                        width: 500px;
                    }

                    .calendar-custom .react-calendar__navigation {
                        background: transparent;
                        color: inherit;
                        border: none;
                    }

                    .calendar-custom .react-calendar__tile {
                        background: transparent;
                        color: inherit;
                        border-radius: 4px;
                        transition: background-color 0.3s, color 0.3s;
                    }

                    .calendar-custom .react-calendar__tile:enabled:hover {
                        background-color: rgba(37, 99, 235, 0.1);
                        color: inherit;
                    }

                    .calendar-custom .react-calendar__tile--active {
                        background-color: #2563eb;
                        color: #fff;
                    }

                    .calendar-custom .react-calendar__tile--active:enabled:hover {
                        background-color: #1d4ed8;
                        color: #fff;
                    }

                    .calendar-custom .react-calendar__tile--now {
                        border: 2px solid #2563eb;
                    }

                    .dark .calendar-custom .react-calendar__navigation {
                        color: #d1d5db;
                    }

                    .dark .calendar-custom .react-calendar__navigation button:enabled:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                        color: #f9fafb; 
                    }

                    .dark .calendar-custom .react-calendar__tile {
                        color: #d1d5db; 
                    }

                    .dark .calendar-custom .react-calendar__tile:enabled:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                        color: #f9fafb;
                    }
                        `}</style>
                        <Calendar
                            value={date}
                            onClickDay={setDate}
                            tileContent={({ date, view }) =>
                                view === "month" && hasTaskOnDate(date) ? (
                                    <div className="flex justify-center items-center mt-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                ) : null
                            }
                            className="calendar-custom w-full max-w-2xl shadow-lg rounded-lg p-8 bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                        />
                    </div>
                    {select.length > 0 ? (
                        <ul className="mt-6 space-y-4">
                            {select.map((task) => (
                                <li
                                    key={task.id}
                                    className="bg-blue-300 p-4 rounded-lg shadow hover:bg-blue-400 cursor-pointer"
                                    onClick={() => openModal(task)}
                                >
                                    <div className="font-semibold text-blue-900">
                                        {task.Task}
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        {task.Deadline.toLocaleDateString(
                                            "en-US"
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-blue-800 mt-6">
                            No tasks for this date.
                        </p>
                    )}
                </div>

                {/* Right Section: Upcoming Deadlines */}
                <div className="lg:w-1/3 p-6 flex flex-col space-y-6">
                    <div>
                        <h3 className="text-blue-800 font-bold text-lg mb-4">
                            Progress Chart
                        </h3>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                    <div>
                        <h3 className="text-blue-800 font-bold text-lg mb-4">
                            Upcoming Deadlines
                        </h3>
                        <ul className="space-y-4">
                            {tasks
                                .filter((task) => {
                                    const today = new Date();
                                    const deadline = new Date(task.Deadline);
                                    return (
                                        deadline >= today &&
                                        deadline <=
                                            new Date(
                                                today.setDate(
                                                    today.getDate() + 7
                                                )
                                            )
                                    );
                                })
                                .map((task) => (
                                    <li
                                        key={task.id}
                                        className="bg-blue-300 p-4 rounded-lg shadow"
                                    >
                                        <strong>{task.Task}</strong> -{" "}
                                        {task.Deadline.toLocaleDateString(
                                            "en-US"
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                        ⚠️ 3 tasks are overdue! Please review them.
                    </div>
                </div>
            </div>

            {/* Floating Add Task Button */}
            <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
                Add Task
            </button>

            {/* Modal */}
            {isModalOpen && selectedTask && (
                <div className="fixed inset-0 bg-blue-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
                        <h2 className="text-xl font-bold text-blue-800 mb-4">
                            Task Details
                        </h2>
                        <p className="text-blue-700">
                            <strong>Task:</strong> {selectedTask.Task}
                        </p>
                        <p className="text-blue-700">
                            <strong>Deadline:</strong>{" "}
                            {selectedTask.Deadline.toLocaleDateString("en-US")}
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
