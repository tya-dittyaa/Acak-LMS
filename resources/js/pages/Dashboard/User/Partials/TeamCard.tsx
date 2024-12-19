import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CopyButton from "./CopyButton";

interface TeamCardProps {
    team: ITeamList;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
    return (
        <Card className="w-full" key={team.id}>
            <CardHeader className="flex gap-4">
                <div className="flex flex-row gap-4 items-center">
                    <Avatar className="h-14 w-14 rounded-lg">
                        <AvatarImage
                            className="h-14 w-14 rounded-lg"
                            src={team.icon ?? ""}
                        />
                        <AvatarFallback className="h-14 w-14 rounded-lg text-4xl">
                            {team.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <CardTitle className="font-bold text-xl">
                            {team.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 flex items-center gap-2">
                            <span>
                                <strong>Code:</strong> {team.code}
                            </span>
                            <CopyButton code={team.code} />
                        </CardDescription>
                    </div>
                </div>

                <h2 className="text-sm">
                    {team.description || "No description provided."}
                </h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 w-full">
                <p className="text-sm text-gray-500">Members:</p>
                <div className="flex items-center gap-2">
                    {team.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id}>
                            <AvatarImage
                                className="size-10 rounded-full"
                                src={member.avatar}
                            />
                        </Avatar>
                    ))}
                    {team.members.length > 3 && (
                        <Avatar className="bg-gray-300 text-gray-700 flex justify-center items-center">
                            <span className="text-sm font-bold">
                                +{team.members.length - 3}
                            </span>
                        </Avatar>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-2">
                <Button
                    className="w-1/2"
                    variant="default"
                    onClick={() =>
                        (window.location.href = `/dashboard/teams/${team.id}`)
                    }
                >
                    Dashboard
                </Button>
                <Button
                    className="w-1/2"
                    variant="default"
                    onClick={() =>
                        (window.location.href = `/dashboard/teams/${team.id}/details`)
                    }
                >
                    Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TeamCard;
