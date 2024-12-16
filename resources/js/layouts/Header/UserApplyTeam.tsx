import InputError from "@/components/default/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface JoinTeamFormProps {
    setOpen: (open: boolean) => void;
    className?: string;
}

interface IJoinTeam {
    team_code: string;
}

const JoinTeamForm: React.FC<JoinTeamFormProps> = ({ setOpen, className }) => {
    const { setData, errors, post, processing } = useForm<IJoinTeam>({
        team_code: "",
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            await post(route("teams.join"), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Request to join the team sent successfully");
                    setOpen(false);
                    window.location.reload();
                },
                onError: (error) => {
                    toast.error(
                        error?.message ||
                            "An error occurred while sending your request."
                    );
                },
            });
        } catch (error: any) {
            const errorMessage =
                error?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-4", className)}
        >
            {/* Team Code Field */}
            <div className="grid gap-2">
                <Label htmlFor="team_code">Team Code</Label>
                <Input
                    type="text"
                    id="team_code"
                    required
                    autoComplete="off"
                    onChange={(e) => setData("team_code", e.target.value)}
                />
                <InputError message={errors.team_code} />
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
                        Sending Request...
                    </>
                ) : (
                    "Apply to Join"
                )}
            </Button>
        </form>
    );
};

export default JoinTeamForm;
