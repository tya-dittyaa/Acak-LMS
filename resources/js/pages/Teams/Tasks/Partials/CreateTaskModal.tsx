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
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useMediaQuery } from "usehooks-ts";
import CreateTaskForm from "./CreateTaskForm";

interface Props {
    team: ITeam;
    teamMembers: IUserTeam[];
}

function TriggerButton() {
    return (
        <Button className="gap-4 justify-center items-center">
            <IoMdAddCircleOutline />
            Create New Task
        </Button>
    );
}

export default function CreateTaskModal(props: Props) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{TriggerButton()}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to create a new task
                        </DialogDescription>
                    </DialogHeader>
                    <CreateTaskForm
                        team={props.team}
                        teamMembers={props.teamMembers}
                        setOpen={setOpen}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{TriggerButton()}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new task
                    </DialogDescription>
                </DrawerHeader>
                <CreateTaskForm
                    team={props.team}
                    teamMembers={props.teamMembers}
                    setOpen={setOpen}
                    className="px-4"
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
