import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useUserTeam } from "@/context/UserTeamProvider";

interface CommandItemData {
    emoji: string;
    pageName: string;
    pageRoute: string;
}

interface CommandGroupData {
    groupName: string;
    items: CommandItemData[];
}

const baseCommandGroups: CommandGroupData[] = [
    {
        groupName: "Dashboard",
        items: [
            {
                emoji: "🏠",
                pageName: "Dashboard Home",
                pageRoute: "/dashboard",
            },
        ],
    },
    {
        groupName: "Teams",
        items: [],
    },
    {
        groupName: "Settings",
        items: [
            {
                emoji: "👤",
                pageName: "Profile Information",
                pageRoute: "/profile",
            },
        ],
    },
];

export default function UserCommand() {
    const { selectedTeam } = useUserTeam();

    // Avoid adding duplicate "Team Details"
    const commandGroups = baseCommandGroups.map((group) => ({
        ...group,
        items: group.items.slice(), // Ensure no mutation
    }));

    if (
        selectedTeam &&
        !commandGroups[1].items.find(
            (item) => item.pageName === "Team Dashboard"
        )
    ) {
        commandGroups[1].items.push({
            emoji: "📊",
            pageName: "Team Dashboard",
            pageRoute: `/dashboard/teams/${selectedTeam.id}`,
        });
    }

    if (
        selectedTeam &&
        !commandGroups[1].items.find((item) => item.pageName === "Team Tasks")
    ) {
        commandGroups[1].items.push({
            emoji: "📋",
            pageName: "Team Tasks",
            pageRoute: `/dashboard/teams/${selectedTeam.id}/tasks`,
        });
    }

    if (
        selectedTeam &&
        !commandGroups[1].items.find((item) => item.pageName === "Team Details")
    ) {
        commandGroups[1].items.push({
            emoji: "📝",
            pageName: "Team Details",
            pageRoute: `/dashboard/teams/${selectedTeam.id}/details`,
        });
    }

    // Filter out groups with no items
    const filteredCommandGroups = commandGroups.filter(
        (group) => group.items.length > 0
    );

    return (
        <Command className="rounded-lg border bg-muted/40">
            <CommandInput
                placeholder="Type a command or search..."
                className="border-none"
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {filteredCommandGroups.map((group, index) => (
                    <CommandGroup key={index} heading={group.groupName}>
                        {group.items.map((item, idx) => (
                            <CommandItem
                                key={idx}
                                onSelect={() =>
                                    (window.location.href = item.pageRoute)
                                }
                            >
                                <span>{item.emoji}</span>
                                <span>{item.pageName}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>
        </Command>
    );
}
