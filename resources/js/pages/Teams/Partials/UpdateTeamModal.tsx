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
import { MdEditSquare } from "react-icons/md";
import { useMediaQuery } from "usehooks-ts";
import UpdateTeamForm from "./UpdateTeamForm";

interface UpdateTeamModalProps {
    team: ITeam;
}

export default function UpdateTeamModal({ team }: UpdateTeamModalProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const TriggerButton = (
        <Button onClick={() => setOpen(true)} size={"icon"} variant={"default"}>
            <MdEditSquare />
        </Button>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Team</DialogTitle>
                        <DialogDescription>
                            Update the team information
                        </DialogDescription>
                    </DialogHeader>
                    <UpdateTeamForm team={team} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DialogTitle>Edit Team</DialogTitle>
                    <DialogDescription>
                        Update the team information
                    </DialogDescription>
                </DrawerHeader>
                <UpdateTeamForm
                    team={team}
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
