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

export default function UserChooseTeam({ teams }: Props) {
    const isDisabled = teams.length === 0;
    const placeholder = isDisabled ? "Create team first" : "Select a team";

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Select your team:
            </h2>

            <Select disabled={isDisabled}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
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