import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/Main/MainLayout";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface Task {
    id: number;
    Task: string;
    Deadline: Date;
}

export default function CalendarFunc() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch('http://localhost:1234/basic.php')
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    const tasksWithDates = data.map((task: any) => ({
                        ...task,
                        Deadline: new Date(task.Deadline),
                    }));
                    setTasks(tasksWithDates);
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const select = tasks.filter(
        (task) => task.Deadline.toDateString() === date?.toDateString()
    );

    const hasTaskOnDate = (day: Date) => {
        return tasks.some(
            (task) => task.Deadline.toDateString() === day.toDateString()
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

                <div className="mt-6 w-full max-w-lg">
                    <h2 className="text-lg font-semibold mb-3">
                        Tasks for {date?.toDateString()}
                    </h2>
                    {select.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {select.map((task) => (
                                <li key={task.id}>{task.Task}</li>
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
