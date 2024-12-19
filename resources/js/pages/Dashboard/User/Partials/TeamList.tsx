import AddTeamButton from "./AddTeamButton";
import TeamCard from "./TeamCard";

interface TeamListProps {
    teams: ITeamList[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
            ))}
            <AddTeamButton />
        </div>
    );
};

export default TeamList;
