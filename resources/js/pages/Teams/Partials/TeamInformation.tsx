import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageProps } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoCopy } from "react-icons/go";
import DeleteTeamForm from "./DeleteTeamForm";
import UpdateTeamModal from "./UpdateTeamModal";

interface Props extends PageProps {
    team: ITeam;
    teamOwner: IUserTeam;
}

export default function TeamInformation({ auth, team, teamOwner }: Props) {
    const [copied, setCopied] = useState(false);
    const hasOwnerRole = teamOwner.id === auth.user.id;

    const handleCopy = () => {
        navigator.clipboard.writeText(team.code).then(() => {
            toast.success("Team code copied to clipboard");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Card>
            <CardContent className="mt-6">
                <div className="flex flex-col md:flex-row gap-4 p-3">
                    {/* Avatar */}
                    <div className="flex flex-col items-center justify-center gap-4 w-full md:w-1/5">
                        <Avatar className="h-32 w-32 rounded-lg">
                            <AvatarImage
                                className="h-32 w-32 rounded-lg"
                                src={team.icon ?? ""}
                            ></AvatarImage>
                            <AvatarFallback className="h-32 w-32 rounded-lg text-4xl">
                                {team.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-4 w-full md:w-3/5">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <h1 className="font-bold text-xl">{team.name}</h1>
                            <h2 className="text-sm text-gray-500 flex items-center gap-2 justify-center md:justify-start">
                                <span>
                                    <strong>Code:</strong> {team.code}
                                </span>
                                <Button
                                    onClick={handleCopy}
                                    size={"icon"}
                                    variant={"ghost"}
                                    className="w-5 h-5"
                                >
                                    <GoCopy />
                                </Button>
                            </h2>
                            <h2 className="text-sm">
                                {team.description || "No description provided."}
                            </h2>
                        </div>
                    </div>

                    {/* Editor */}
                    {hasOwnerRole && (
                        <div className="flex flex-row md:flex-col items-center justify-center gap-4 w-full md:w-1/5">
                            <UpdateTeamModal team={team} />
                            <DeleteTeamForm team={team} />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
