import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { MdSpaceDashboard } from "react-icons/md";
import TeamApplication from "./Partials/TeamApplication";
import TeamInformation from "./Partials/TeamInformation";
import TeamMember from "./Partials/TeamMember";

interface Props extends PageProps {
    team: ITeam;
    teamApplications: IUserTeam[];
    teamMembers: IUserTeam[];
    teamOwner: IUserTeam;
}

export default function TeamDetails(props: Props) {
    const { auth, team, teamApplications, teamMembers, teamOwner } = props;

    return (
        <MainLayout auth={props.auth} title="Dashboard" hasPadding>
            <PageTitle
                title="Team Details"
                icon={<MdSpaceDashboard className="size-6 md:size-7" />}
            />

            <div className="flex flex-col gap-4">
                <TeamInformation
                    auth={auth}
                    team={team}
                    teamOwner={teamOwner}
                />

                <div className="flex flex-col lg:flex-row gap-4">
                    <TeamMember
                        auth={auth}
                        team={team}
                        members={teamMembers}
                        teamOwner={teamOwner}
                    />
                    <TeamApplication
                        auth={auth}
                        team={team}
                        members={teamApplications}
                        teamOwner={teamOwner}
                    />
                </div>
            </div>
        </MainLayout>
    );
}
