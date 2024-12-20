import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { FaTasks } from "react-icons/fa";

interface props extends PageProps {
    team: ITeam;
    tasks: ITask[];
    teamMembers: IUserTeam[];
}

export default function TaskLayout(props: props) {
    return (
        <MainLayout auth={props.auth} title="Team Tasks" hasPadding>
            <PageTitle
                title="Team Tasks"
                icon={<FaTasks className="size-6 md:size-7" />}
            />

            <div className="flex flex-row gap-4"></div>
        </MainLayout>
    );
}
