import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import JoinTeamForm from "./UserApplyTeam";
import CreateTeamForm from "./UserCreateTeam";

function TeamTabs({ setOpen }: { setOpen: (open: boolean) => void }) {
    return (
        <Tabs defaultValue="join" className="flex flex-col w-full gap-4">
            <TabPanel
                value="join"
                title="Join Team"
                description="Enter the team code to join a team"
            >
                <TabsNavigation />
                <Separator />
                <JoinTeamForm setOpen={setOpen} />
            </TabPanel>
            <TabPanel
                value="create"
                title="Create New Team"
                description="Fill in the form below to create a new team"
            >
                <TabsNavigation />
                <Separator />
                <CreateTeamForm setOpen={setOpen} />
            </TabPanel>
        </Tabs>
    );
}

function TabPanel({
    value,
    title,
    description,
    children,
}: {
    value: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <TabsContent value={value}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </div>
                    {children}
                </div>
            </div>
        </TabsContent>
    );
}

function TabsNavigation() {
    return (
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
                value="join"
                className="w-full gap-2 justify-center items-center"
            >
                <IoMdAddCircleOutline />
                Join
            </TabsTrigger>
            <TabsTrigger
                value="create"
                className="w-full gap-2 justify-center items-center"
            >
                <IoCreateOutline />
                Create
            </TabsTrigger>
        </TabsList>
    );
}

export default function UserModalTeam({
    triggerButton,
}: {
    triggerButton: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{triggerButton}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-3">
                        <TeamTabs setOpen={setOpen} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="flex flex-col gap-3 text-left">
                    <TeamTabs setOpen={setOpen} />
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
