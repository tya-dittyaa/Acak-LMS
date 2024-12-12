import InputError from "@/components/default/InputError";
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
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler, useRef, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useMediaQuery } from "usehooks-ts";

function AddTeamForm({
    setOpen,
    className,
}: React.ComponentProps<"form"> & { setOpen: (open: boolean) => void }) {
    const nameInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const iconInput = useRef<HTMLInputElement>(null);

    const { setData, errors, post, reset, processing } = useForm<ICreateTeam>({
        name: "",
        description: null,
        icon: null,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("teams.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Team created successfully");
                reset();
                nameInput.current?.focus();
                descriptionInput.current?.focus();
                iconInput.current?.focus();
                setOpen(false);
            },
            onError: (errors) => {
                toast.error(errors.message);
            },
        });
    };

    return (
        <form
            onSubmit={onSubmit}
            className={cn("grid items-start gap-4", className)}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    required
                    autoComplete="name"
                    ref={nameInput}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    autoComplete="description"
                    ref={descriptionInput}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                    type="file"
                    id="icon"
                    ref={iconInput}
                    onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setData("icon", file);
                    }}
                />
                <InputError message={errors.icon} />
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Creating...
                    </>
                ) : (
                    "Create Team"
                )}
            </Button>
        </form>
    );
}

export default function UserCreateTeam() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full gap-4 justify-center items-center">
                        <IoCreateOutline />
                        Create Team
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Team</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new team
                        </DialogDescription>
                    </DialogHeader>
                    <AddTeamForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="w-full gap-4 justify-center items-center">
                    <IoCreateOutline />
                    Create Team
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create New Team</DrawerTitle>
                    <DrawerDescription>
                        Fill in the form below to create a new team
                    </DrawerDescription>
                </DrawerHeader>
                <AddTeamForm className="px-4" setOpen={setOpen} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
