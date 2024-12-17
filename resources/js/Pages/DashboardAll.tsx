import React from "react";
import MainLayout from "@/Layouts/Main/MainLayout";
import DashboardShowTeam from "@/Components/DashboardShowTeam";
import { useNavigate } from "react-router-dom";

export default function DashboardAll() {
    const navigate = useNavigate();

    const teamData = [
        {
            teamName: "Team One",
            teamLogo: "https://via.placeholder.com/150",
            progress: 75,
            tasks: ["Task 1", "Task 2", "Task 3"],
        },
        {
            teamName: "Team Two",
            teamLogo: "https://via.placeholder.com/150",
            progress: 50,
            tasks: ["Task 4", "Task 5", "Task 6"],
        },
    ];

    const goToDetails = (teamName: string) => {
        navigate(`/project-details/${teamName}`);
    };

    return (
        <MainLayout title="Dashboard Show Team Participated">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teamData.map((team, index) => (
                    <DashboardShowTeam
                        key={index}
                        teamName={team.teamName}
                        teamLogo={team.teamLogo}
                        progress={team.progress}
                        tasks={team.tasks}
                        onViewDetails={() => goToDetails(team.teamName)}
                    />
                ))}
            </div>
        </MainLayout>
    );
}
