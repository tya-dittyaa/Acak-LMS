import AcakLogo from "@/Components/ui/acak-logo";

export function WebNavbar(): JSX.Element {
    return (
        <nav className="hidden flex-col gap-5 text-lg font-medium md:flex md:flex-row md:items-center md:gap-4 md:text-sm lg:gap-5">
            <div className="hidden md:flex">
                <AcakLogo subtitle="Learning Management System" />
            </div>
        </nav>
    );
}
