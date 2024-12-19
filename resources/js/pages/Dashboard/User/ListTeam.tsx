import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { MdSpaceDashboard } from "react-icons/md";
import TeamList from "./Partials/TeamList";

interface Props extends PageProps {
    teams: ITeamList[];
}

const ListTeam: React.FC<Props> = (props) => {
    return (
        <MainLayout auth={props.auth} title="Dashboard" hasPadding>
            <PageTitle
                title="Dashboard"
                icon={<MdSpaceDashboard className="size-6 md:size-7" />}
            />
            <TeamList teams={props.teams} />
        </MainLayout>
    );
};

export default ListTeam;
