import React from "react";

interface Props {
    teamName: string;
    teamLogo: string;
    progress: number;
    tasks: string[];
    onViewDetails: () => void;
}

export default function DashboardShowTeam({
    teamName,
    teamLogo,
    progress,
    tasks,
    onViewDetails,
}: Props) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <img
                    src={teamLogo}
                    alt={`${teamName} Logo`}
                    className="w-16 h-16 rounded-full object-cover mb-2 sm:mb-0 sm:mr-4"
                />
                <h2 className="text-xl font-bold text-gray-900">{teamName}</h2>
                <button
                    onClick={onViewDetails}
                    className="ml-4 py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    View Details
                </button>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Progress</h3>
                <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden mt-1">
                    <div
                        className="bg-blue-500 h-full rounded-md"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                    {progress}% Complete
                </p>
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
}
