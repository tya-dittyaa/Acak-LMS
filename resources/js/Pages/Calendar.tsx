import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/Main/MainLayout";
import Calendar from "react-calendar";
import Dropdown from "@/Components/Dropdown";

import "react-calendar/dist/Calendar.css";

interface Task {
    id: number;
    Task: string;
    Deadline: Date;
}

export default function CalendarFunc() {
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
            Task: "ini tes",
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
        <MainLayout title="Task Reminder Calendar">
            <div className="flex min-h-dvh flex-wrap">
                {/* Left Content */}
                <div className="flex flex-col w-full lg:w-1/3">
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
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                            ) : null
                        }
                        className="calendar-custom w-full max-w-2xl shadow-lg rounded-lg p-8 bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col w-full lg:w-2/3">
                    <div className="ml-10 w-full max-w">
                        {select.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-800 dark:text-gray-100">
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
                                                    Category
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
                            <p className="text-gray-700 dark:text-gray-300">
                                No tasks for this date.
                            </p>
                        )}
                    </div>
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
