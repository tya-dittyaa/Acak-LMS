import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface CommandItemData {
    emoji: string;
    pageName: string;
    pageRoute: string;
}

interface CommandGroupData {
    groupName: string;
    items: CommandItemData[];
}

const commandGroups: CommandGroupData[] = [
    {
        groupName: "Homepage",
        items: [
            {
                emoji: "👋",
                pageName: "Welcome Page",
                pageRoute: "/",
            },
        ],
    },
];

export default function NavCommand() {
    return (
        <Command className="rounded-lg border bg-muted/40">
            <CommandInput
                placeholder="Type a command or search..."
                className="border-none"
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {commandGroups.map((group, index) => (
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
