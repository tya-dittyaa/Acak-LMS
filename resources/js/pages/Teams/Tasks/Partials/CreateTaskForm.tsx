import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";

interface Props {
    team: ITeam;
    teamMembers: IUserTeam[];
    setOpen: (open: boolean) => void;
    className?: string;
}

interface IPostTask {
    title: string;
    description?: string | null;
    priority: TaskPriority;
    due_date: string;
    assigned_to: string[];
}

const CreateTaskForm: React.FC<Props> = ({
    team,
    teamMembers,
    setOpen,
    className,
}) => {
    const { setData, data, errors, post, reset, processing } =
        useForm<IPostTask>({
            title: "",
            description: null,
            priority: "Low",
            due_date: new Date().toISOString().slice(0, 16),
            assigned_to: [],
        });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route("api.tasks.store", { teamId: team.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Task created successfully");
                reset();
                setOpen(false);
            },
            onError: () => {
                toast.error("Failed to create task");
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-4", className)}
        >
            {/* Title Field */}
            <FormField
                id="title"
                label="Title"
                type="text"
                required
                error={errors.title}
                onChange={(e) => setData("title", e.target.value)}
            />

            {/* Description Field */}
            <FormField
                id="description"
                label="Description"
                type="textarea"
                error={errors.description}
                onChange={(e) => setData("description", e.target.value)}
            />

            {/* Assigned To Field */}
            <div className="grid gap-2">
                <Label htmlFor="assigned_to">Assign to Members</Label>
                <MultiSelect
                    options={teamMembers.map((member) => ({
                        value: member.id,
                        label: member.name,
                    }))}
                    onValueChange={(value) =>
                        setData("assigned_to", value as string[])
                    }
                    placeholder="Select options"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                />
                <InputError message={errors.assigned_to} />
            </div>

            {/* Priority Field */}
            <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                    onValueChange={(value) =>
                        setData("priority", value as TaskPriority)
                    }
                    defaultValue={data.priority}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Low" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Mid">Mid</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Due Date Field */}
            <div className="grid gap-2">
                <Label htmlFor="due_date">Due Date</Label>
                <div className="relative">
                    <Input
                        type="datetime-local"
                        id="due_date"
                        value={data.due_date}
                        onChange={(e) => setData("due_date", e.target.value)}
                        className="dark:calendar-invert"
                    />
                </div>
                <InputError message={errors.due_date} />
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
                        <MdAdd className="mr-2" />
                        Create Task
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

export default CreateTaskForm;
