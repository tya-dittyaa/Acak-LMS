import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { UserAvatarSession } from "@/components/ui/user-avatar";
import { LoginButton, LogoutButton } from "@/components/ui/user-button";
import { PageProps } from "@/types";
import UserCommand from "./UserCommand";

interface Props extends PageProps {}

function UserProfile({ auth }: PageProps) {
    const user = auth.user;

    return (
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3">
            <UserAvatarSession user={user} className="h-12 w-12" />
            <div className="text-center sm:text-left">
                <SheetTitle className="text-lg sm:text-xl">
                    {user.name}
                </SheetTitle>
                <SheetDescription className="text-sm sm:text-base">
                    {user.email}
                </SheetDescription>
            </div>
        </div>
    );
}

function SheetSidebar({ auth }: PageProps) {
    const user = auth.user;
    return (
        <Sheet>
            <SheetTrigger>
                <UserAvatarSession user={user} className="h-9 w-9" />
            </SheetTrigger>
            <SheetContent side="right" className="flex min-h-svh flex-col">
                <UserProfile auth={auth} />
                <Separator />
                <UserCommand />
                <Separator />
                <LogoutButton />
            </SheetContent>
        </Sheet>
    );
}

export default function UserSidebar({ auth }: Props) {
    const user = auth.user;

    return (
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {user && <SheetSidebar auth={auth} />}
            {!user && <LoginButton />}
        </div>
    );
}
