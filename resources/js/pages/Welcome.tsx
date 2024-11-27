import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";

interface Props extends PageProps {}

export default function Welcome({ auth }: Props) {
    return (
        <MainLayout auth={auth} title="Welcome" hasPadding>
            <div>
                <h1>Welcome Page</h1>
            </div>
        </MainLayout>
    );
}
