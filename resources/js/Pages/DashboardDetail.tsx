import React from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const ProjectDetailPage: React.FC = () => {
    const { teamName } = useParams<{ teamName: string }>();

    // Sample data
    const progressData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Progress",
                data: [20, 40, 60, 80, 70, 90, 100], // Replace with actual data
                fill: false,
                backgroundColor: "blue",
                borderColor: "blue",
            },
        ],
    };

    const tasks = [
        "Setup project environment",
        "Design the main layout",
        "Implement user authentication",
        "Add data visualization charts",
        "Test and deploy the project",
    ]; // Replace with actual tasks data based on teamName

    return (
        <div className="p-4 bg-white rounded-lg shadow-md sm:p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900">
                {teamName} - Project Details
            </h1>

            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Progress</h3>
                <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden mt-1">
                    <div
                        className="bg-blue-500 h-full rounded-md"
                        style={{ width: `100%` }} // Set to 100% for a visual representation
                    ></div>
                </div>
                <Line data={progressData} />
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-700">Tasks</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    {tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
