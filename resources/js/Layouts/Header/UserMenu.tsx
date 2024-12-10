import ThemeButton from "@/Components/ui/theme-button";
import { UserAvatarSkeleton } from "@/Components/ui/user-avatar";

export default function UserMenu() {
    return (
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="hidden md:flex">
                <ThemeButton />
            </div>

            <UserAvatarSkeleton />
        </div>
    );
}
