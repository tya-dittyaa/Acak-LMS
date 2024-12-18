import React from "react";

interface DashboardAllProps {
    teamName: string;
    teamLogo: string;
    progress: number;
    onHover: () => void;
}

export default function DashboardAll({
    teamName,
    teamLogo,
    progress,
    onHover,
}: DashboardAllProps) {
    return (
        <div
            className="flex flex-col rounded-lg shadow-lg p-6 hover:scale-105 transition-transform border-4"
            onMouseEnter={onHover}
        >
            <img
                src={teamLogo}
                alt={`${teamName} logo`}
                className="w-full h-32 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg text-center mb-2">{teamName}</h3>

            <p className="text-center text-sm mb-2">Progress: {progress}%</p>

            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
