import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { FaRegUserCircle } from "react-icons/fa";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdateAvatarForm from "./Partials/UpdateAvatarForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformation from "./Partials/UpdateProfileInformationForm";

interface Props extends PageProps {
    mustVerifyEmail: boolean;
    passwordAvailable: boolean;
    status?: string;
}

export default function Edit(props: Props) {
    return (
        <MainLayout auth={props.auth} title="Profile" hasPadding>
            <PageTitle
                title="Profile Information"
                icon={<FaRegUserCircle className="size-6 md:size-7" />}
            />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row gap-4 h-full">
                    {/* Avatar section */}
                    <div className="flex flex-col lg:w-1/2 gap-4">
                        <UpdateAvatarForm />
                    </div>

                    {/* Profile information section */}
                    <div className="flex flex-col lg:w-1/2 gap-4">
                        <UpdateProfileInformation {...props} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 h-full">
                    {/* Password section */}
                    <div className="flex flex-col lg:w-1/2 gap-4">
                        <UpdatePasswordForm
                            passwordAvailable={props.passwordAvailable}
                        />
                    </div>

                    {/* Profile information section */}
                    <div className="flex flex-col lg:w-1/2 gap-4">
                        <DeleteUserForm
                            passwordAvailable={props.passwordAvailable}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
