import ApplicationLogo from "@/components/default/ApplicationLogo";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import MobileSidebar from "./MenuSidebar";
import UserSidebar from "./UserSidebar";

interface Props extends PageProps {
    title: string;
}

export default function HeaderLayout(props: Props) {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background justify-between z-50 px-4 md:px-6">
            {/* Head */}
            <Head title={props.title} />

            {/* Mobile Sidebar */}
            <MobileSidebar />

            {/* Logo (Hidden on Mobile) */}
            <div className="hidden md:flex">
                <ApplicationLogo subtitle="LEARNING MANAGEMENT SYSTEM" />
            </div>

            {/* Logo (Visible on Mobile) */}
            <div className="flex md:hidden">
                <ApplicationLogo subtitle="LMS" />
            </div>

            {/* User Sidebar */}
            <UserSidebar auth={props.auth} />
        </header>
    );
}
