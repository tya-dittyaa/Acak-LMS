import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/Main/MainLayout";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

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

    useEffect(() => {
        fetch("http://localhost:1234/basic.php")
            .then((response) => response.json())
            .then((data) => {
                if (!data.error) {
                    const tasksWithDates = data.map((task: any) => ({
                        ...task,
                        Deadline: new Date(task.Deadline),
                    }));
                }
            })
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

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

    return (
        <MainLayout title="Dashboard">
            <div className="flex min-h-dvh flex-wrap">
                {/* Left Section: Team Logo */}
                <div className="flex flex-col w-full lg:w-1/3 p-4">
                    <div>
                        <img src="" alt="Team Logo" className="w-full" />
                        <ul className="mt-4">
                            <li>Member A</li>
                            <li>Member B</li>
                            <li>Member C</li>
                            <li>Member D</li>
                        </ul>
                    </div>
                </div>

                {/* Middle Section: Task List and Visualization */}
                <div className="flex flex-col w-full lg:w-1/3 p-4">
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-2">
                            Task List
                        </h3>
                        <div className="space-y-2">
                            <div className="bg-gray-100 p-4 rounded">
                                Task 1
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                Task 2
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                Task 3
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Visualization Charts
                        </h3>
                        <div className="bg-gray-200 h-40 rounded"></div>
                    </div>
                </div>

                {/* Right Section: Calendar */}
                <div className="flex flex-col w-full lg:w-1/3 p-4">
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
                        className="calendar-custom w-full max-w-2xl shadow-lg rounded-lg p-8 bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                    />

                    {select.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-800 dark:text-gray-100 mt-4">
                            {select.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-gray-100 dark:bg-gray-800 w-full rounded-md shadow-md mb-4 cursor-pointer"
                                    onClick={() => openModal(task)}
                                >
                                    <div className="flex flex-row space-x-4">
                                        <div className="flex flex-col justify-center items-center pl-4 pr-4 border-r-2 border-gray-300 dark:border-gray-700">
                                            <div className="text-gray-700 dark:text-gray-300 font-medium">
                                                {task.Deadline.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "long",
                                                    }
                                                )}
                                            </div>
                                            <div className="text-gray-900 dark:text-gray-100 text-lg font-bold">
                                                {task.Deadline.getDate()}
                                            </div>
                                        </div>

                                        <div className="flex flex-col pt-4 pb-4 space-y-4">
                                            <div className="text-gray-700 dark:text-gray-300 text-xl font-semibold">
                                                Task Details
                                            </div>
                                            <div className="text-gray-900 dark:text-gray-100 text-lg">
                                                {task.Task}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            No tasks for this date.
                        </p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedTask && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Task Details
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Task:</strong> {selectedTask.Task}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Deadline:</strong>{" "}
                            {selectedTask.Deadline.toLocaleDateString("en-US")}
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
