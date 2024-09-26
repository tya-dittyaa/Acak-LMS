import AcakLogo from "@/Components/ui/acak-logo";
import { Head } from "@inertiajs/react";
import MobileSidebar from "./MobileSidebar";
import UserMenu from "./UserMenu";
import { WebNavbar } from "./WebNavbar";

interface HeaderLayoutProps {
    title: string;
}

export default function HeaderLayout({ title }: HeaderLayoutProps) {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background justify-between z-50 px-4 md:px-6">
            <Head title={title} />

            {/* Web Navbar */}
            <WebNavbar />

            {/* Mobile Sidebar */}
            <MobileSidebar />

            {/* Acak Logo */}
            <div className="flex md:hidden">
                <AcakLogo subtitle="LMS" />
            </div>

            {/* User Menu */}
            <UserMenu />
        </header>
    );
}
