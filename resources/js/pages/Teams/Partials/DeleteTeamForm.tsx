import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserTeam } from "@/context/UserTeamProvider";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

interface DeleteTeamFormProps {
    team: ITeam;
}

export default function DeleteTeamForm({ team }: DeleteTeamFormProps) {
    const { delete: destroy, processing } = useForm();
    const { removeTeam } = useUserTeam();

    const handleDelete = () => {
        destroy(
            route("api.teams.destroy", {
                teamId: team.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("The team has been successfully deleted.");
                    removeTeam(team.id);
                },
                onError: (error) => {
                    toast.error(
                        error?.message ||
                            "An error occurred while processing the request."
                    );
                },
            }
        );
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} variant={"destructive"}>
                    <FaTrash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this team?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex flex-row items-center mt-2">
                            <Avatar className="h-12 w-12 rounded-lg">
                                <AvatarImage
                                    className="h-12 w-12 rounded-lg items-center justify-center"
                                    src={team.icon ?? ""}
                                ></AvatarImage>
                                <AvatarFallback className="h-12 w-12 rounded-lg">
                                    {team.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col text-left ml-3">
                                <h1 className="font-bold text-l ">
                                    {team.name}
                                </h1>
                                <h2 className="text-sm text-gray-500">
                                    <span>
                                        <strong>Code:</strong> {team.code}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? "Processing..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
