import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUserTeam } from "@/context/UserTeamProvider";
import { UserTeam } from "@/types";

interface Props {
    teams: UserTeam[];
}

export default function UserChooseTeam({ teams }: Props) {
    const isDisabled = teams.length === 0;
    const placeholder = isDisabled ? "Create team first" : "Select a team";
    const { selectedTeam, setSelectedTeam } = useUserTeam();

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Select your team:
            </h2>

            <Select
                disabled={isDisabled}
                onValueChange={(value) => {
                    const team = teams.find((team) => team.id === value);
                    setSelectedTeam(team || null);
                }}
                value={selectedTeam?.id || ""}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder}>
                        {selectedTeam ? (
                            <div className="flex items-center gap-x-2">
                                <Avatar className="w-6 h-6 border border-input shadow-sm rounded-lg">
                                    <AvatarImage
                                        src={selectedTeam.icon}
                                        alt={selectedTeam.name}
                                        className="rounded-lg"
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {selectedTeam.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">
                                    {selectedTeam.name}
                                </span>
                            </div>
                        ) : (
                            placeholder
                        )}
                    </SelectValue>
                </SelectTrigger>
                {!isDisabled && (
                    <SelectContent>
                        <SelectGroup>
                            {teams.map(({ id, icon, name }) => (
                                <SelectItem key={id} value={id}>
                                    <div className="flex items-center gap-x-2">
                                        <Avatar className="w-6 h-6 border border-input shadow-sm rounded-lg">
                                            <AvatarImage
                                                src={icon}
                                                alt={name}
                                                className="rounded-lg"
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                )}
            </Select>
        </div>
    );
}
