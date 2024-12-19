import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { MdSpaceDashboard } from "react-icons/md";

interface Props extends PageProps {}

export default function Dashboard(props: Props) {
    return (
        <MainLayout auth={props.auth} title="Dashboard" hasPadding>
            <PageTitle
                title="Dashboard"
                icon={<MdSpaceDashboard className="size-6 md:size-7" />}
            />
        </MainLayout>
    );
}
