import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEditSquare } from "react-icons/md";

interface UpdateTeamFormProps {
    team: ITeam;
    setOpen: (open: boolean) => void;
    className?: string;
}

interface IUpdateTeam {
    name: string;
    description?: string | null;
    icon: File | null;
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({
    team,
    setOpen,
    className,
}) => {
    const nameInputRef = useRef<HTMLInputElement>(null);

    const {
        setData,
        errors,
        post,
        delete: destroy,
        reset,
        processing,
    } = useForm<IUpdateTeam>({
        name: team.name,
        description: team.description,
        icon: null,
    });

    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route("api.teams.update", { teamId: team.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Team updated successfully");
                reset();
                setOpen(false);
            },
            onError: (error) =>
                toast.error(error.message || "An error occurred"),
        });
    };

    const handleDeleteIcon = () => {
        setIsDeleting(true);

        destroy(route("api.teams.destroyIcon", { teamId: team.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Team profile picture deleted successfully");
                setData("icon", null);
            },
            onError: (error) =>
                toast.error(
                    error?.message || "Failed to delete profile picture"
                ),
            onFinish: () => setIsDeleting(false),
        });
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("icon", file);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-4", className)}
        >
            {/* Name Field */}
            <FormField
                id="name"
                label="Name"
                type="text"
                ref={nameInputRef}
                required
                defaultValue={team.name}
                error={errors.name}
                onChange={(e) => setData("name", e.target.value)}
            />

            {/* Description Field */}
            <FormField
                id="description"
                label="Description"
                type="textarea"
                defaultValue={team.description || ""}
                error={errors.description}
                onChange={(e) => setData("description", e.target.value)}
            />

            {/* Icon Field */}
            <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                {team.icon ? (
                    <div className="flex flex-col items-center gap-4 mt-2">
                        <img
                            src={team.icon}
                            alt="Current team icon"
                            className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex gap-2 w-full">
                            <Input
                                type="file"
                                id="icon"
                                onChange={handleIconChange}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDeleteIcon}
                                disabled={isDeleting}
                                className="flex gap-2 items-center w-1/2"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <MdDelete />
                                        Delete Icon
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Input type="file" id="icon" onChange={handleIconChange} />
                )}
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

interface FormFieldProps {
    id: string;
    label: string;
    type: "text" | "textarea";
    required?: boolean;
    defaultValue?: string | null;
    error?: string;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
    ({ id, label, type, required, defaultValue, error, onChange }, ref) => (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            {type === "textarea" ? (
                <Textarea
                    id={id}
                    required={required}
                    defaultValue={defaultValue || ""}
                    onChange={onChange}
                />
            ) : (
                <Input
                    type="text"
                    id={id}
                    required={required}
                    defaultValue={defaultValue || ""}
                    onChange={onChange}
                    ref={ref}
                />
            )}
            <InputError message={error} />
        </div>
    )
);

FormField.displayName = "FormField";

export default UpdateTeamForm;
