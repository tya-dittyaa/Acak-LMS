import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoCopy } from "react-icons/go";

interface Props {
    team: ITeam;
}

export default function TeamInformation({ team }: Props) {
    const [copied, setCopied] = useState(false);

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
                <div className="flex flex-col lg:flex-row gap-4 p-3">
                    {/* Avatar */}
                    <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/4">
                        <Avatar className="h-32 w-32 rounded-lg">
                            <AvatarImage
                                className="h-32 w-32 rounded-lg"
                                src={team.icon ?? ""}
                            ></AvatarImage>
                            <AvatarFallback className="h-32 w-32 rounded-lg">
                                {team.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-4 w-full lg:w-3/4">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-xl">{team.name}</h1>
                            <h2 className="text-sm text-gray-500 flex items-center gap-2">
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
                            <h2 className="text-sm">{team.description}</h2>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
