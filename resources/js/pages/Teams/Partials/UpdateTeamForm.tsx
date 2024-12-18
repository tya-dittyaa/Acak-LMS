import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { MdEditSquare } from "react-icons/md";

interface UpdateTeamFormProps {
    team: ITeam;
    setOpen: (open: boolean) => void;
    className?: string;
}

interface IUpdateTeam {
    name: string;
    description?: string;
    icon: File | null;
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({
    team,
    setOpen,
    className,
}) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const iconInputRef = useRef<HTMLInputElement>(null);

    const { setData, errors, patch, reset, processing } = useForm<IUpdateTeam>({
        name: team.name,
        description: team.description,
        icon: null,
    });

    useEffect(() => {
        // Focus on the name field when the form opens
        nameInputRef.current?.focus();
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        patch(route("api.teams.update", { teamId: team.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Team updated successfully");
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
            {/* Name Field */}
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    required
                    autoComplete="name"
                    ref={nameInputRef}
                    defaultValue={team.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} />
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    autoComplete="description"
                    ref={descriptionInputRef}
                    defaultValue={team.description || ""}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} />
            </div>

            {/* Icon Field */}
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

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={processing}
                className="flex items-center justify-center"
            >
                {processing ? (
                    <>
                        <Loader2 className="animate-spin mr-2" />
                        Updating...
                    </>
                ) : (
                    <>
                        <MdEditSquare />
                        Update Team
                    </>
                )}
            </Button>
        </form>
    );
};

export default UpdateTeamForm;
