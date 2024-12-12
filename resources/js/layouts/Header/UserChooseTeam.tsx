import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserTeam } from "@/types";

interface Props {
    teams: UserTeam[];
}

export default function UserChooseTeam(props: Props) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Select your team:
            </h2>

            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {props.teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                                <div className="flex flex-row items-center gap-x-2">
                                    <Avatar className="w-6 h-6 border border-input shadow-sm rounded-lg">
                                        <AvatarImage
                                            src={team.icon}
                                            className="rounded-lg"
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {team.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{team.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
