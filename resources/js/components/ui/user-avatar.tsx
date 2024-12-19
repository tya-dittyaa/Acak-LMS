import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";

type Props = {
    name: string;
    avatar: string;
    className?: string;
};

function renderAvatar({ name, avatar, className }: Props): JSX.Element {
    return (
        <Avatar
            className={cn(
                "rounded-full border border-input shadow-sm",
                className
            )}
        >
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}

function UserAvatarSkeleton(): JSX.Element {
    return <Skeleton className="h-9 w-9 rounded-full" />;
}

function UserAvatarSession({
    user,
    className,
}: {
    user: User;
    className?: string;
}): JSX.Element {
    const avatar = user.avatar ?? "";
    const name = user.name ?? "User";

    return renderAvatar({ name, avatar, className });
}

function UserAvatar({
    user,
    className,
}: {
    user: User;
    className?: string;
}): JSX.Element {
    const { avatar, name } = user;

    return renderAvatar({ name, avatar, className });
}

export { UserAvatar, UserAvatarSession, UserAvatarSkeleton };
