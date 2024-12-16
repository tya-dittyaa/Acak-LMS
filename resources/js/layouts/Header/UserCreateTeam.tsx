import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
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

    const { setData, errors, post, reset, processing } = useForm<ICreateTeam>({
        name: "",
        description: null,
        icon: null,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route("teams.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Team created successfully");
                reset();
                focusInputs();
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message || "An error occurred");
            },
        });
    };

    const focusInputs = () => {
        nameInputRef.current?.focus();
        descriptionInputRef.current?.focus();
        iconInputRef.current?.focus();
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