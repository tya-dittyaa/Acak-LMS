import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserTeam } from "@/context/UserTeamProvider";
import { cn } from "@/lib/utils";
import { UserTeam } from "@/types";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { IoCreateOutline } from "react-icons/io5";

interface CreateTeamFormProps {
    setOpen: (open: boolean) => void;
    className?: string;
}

interface ICreateTeam {
    name: string;
    description: string | null;
    icon: File | null;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
    setOpen,
    className,
}) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const iconInputRef = useRef<HTMLInputElement>(null);

    const { updateTeam, setSelectedTeam } = useUserTeam();
    const { setData, errors, post, reset, processing } = useForm<ICreateTeam>({
        name: "",
        description: null,
        icon: null,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route("api.teams.store"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                const newTeam = props.auth.teams[
                    props.auth.teams.length - 1
                ] as UserTeam;
                updateTeam(newTeam);
                setSelectedTeam(newTeam);

                toast.success("Team created successfully");
                reset();
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "An error occurred");
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-4", className)}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    required
                    autoComplete="name"
                    ref={nameInputRef}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    autoComplete="description"
                    ref={descriptionInputRef}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                    type="file"
                    id="icon"
                    ref={iconInputRef}
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setData("icon", file);
                    }}
                />
                <InputError message={errors.icon} />
            </div>
            <Button
                type="submit"
                disabled={processing}
                className="flex items-center justify-center"
            >
                {processing ? (
                    <>
                        <Loader2 className="animate-spin mr-2" />
                        Creating...
                    </>
                ) : (
                    <>
                        <IoCreateOutline />
                        Create Team
                    </>
                )}
            </Button>
        </form>
    );
};

export default CreateTeamForm;
