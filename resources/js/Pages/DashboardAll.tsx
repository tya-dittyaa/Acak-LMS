import MainLayout from "@/Layouts/Main/MainLayout";
import ProjectCard from "@/Components/ProjectCard";

export default function DashboardAll() {
    const projects = [
        {
            id: 1,
            teamName: "Team One",
            teamLogo: "https://via.placeholder.com/150",
            progress: 75,
        },
        {
            id: 2,
            teamName: "Team Two",
            teamLogo: "https://via.placeholder.com/150",
            progress: 50,
        },
        {
            id: 3,
            teamName: "Team Three",
            teamLogo: "https://via.placeholder.com/150",
            progress: 65,
        },
        {
            id: 4,
            teamName: "Team Four",
            teamLogo: "https://via.placeholder.com/150",
            progress: 80,
        },
        {
            id: 5,
            teamName: "Team Five",
            teamLogo: "https://via.placeholder.com/150",
            progress: 40,
        },
    ];

    return (
        <MainLayout title="Dashboard Show Team Participated">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        teamName={project.teamName}
                        teamLogo={project.teamLogo}
                        progress={project.progress}
                        onHover={() =>
                            console.log(`Hovered over ${project.teamName}`)
                        }
                    />
                ))}
            </div>
        </MainLayout>
    );
}
