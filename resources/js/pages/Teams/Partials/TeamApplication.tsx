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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

interface Props {
    team: ITeam;
    members: IUserTeam[];
}

interface UserLayoutProps {
    member: IUserTeam;
}

interface FormProps {
    team: ITeam;
    member: IUserTeam;
}

function UserLayout({ member }: UserLayoutProps) {
    return (
        <div className="flex flex-row items-center mt-2">
            <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage
                    className="h-12 w-12 rounded-lg items-center justify-center"
                    src={member.avatar}
                ></AvatarImage>
                <AvatarFallback className="h-12 w-12 rounded-lg">
                    {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-left ml-3">
                <h1 className="font-bold text-l ">{member.name}</h1>
                <h2 className="text-sm text-gray-500">{member.email}</h2>
            </div>
        </div>
    );
}

function DeclineApplicationForm({ team, member }: FormProps) {
    const { patch, processing, errors } = useForm();

    const handleDecline = async () => {
        try {
            await patch(
                route("api.teams.decline", {
                    teamId: team.id,
                    memberId: member.id,
                }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success(
                            `${member.name} has been declined successfully!`
                        );
                    },
                    onError: (error) => {
                        toast.error(
                            error?.message ||
                                "An error occurred while processing the request."
                        );
                    },
                }
            );
        } catch (error: any) {
            const errorMessage =
                error?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className=" text-red-500 bg-transparent"
                    size="icon"
                >
                    <AiOutlineClose />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to decline this application?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <UserLayout member={member} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDecline}
                        disabled={processing}
                    >
                        {processing ? "Processing..." : "Decline"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function AcceptApplicationForm({ team, member }: FormProps) {
    const { patch, processing, errors } = useForm();

    const handleAccept = async () => {
        try {
            await patch(
                route("api.teams.accept", {
                    teamId: team.id,
                    memberId: member.id,
                }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success(
                            `${member.name} has been accepted successfully!`
                        );
                    },
                    onError: (error) => {
                        toast.error(
                            error?.message ||
                                "An error occurred while processing the request."
                        );
                    },
                }
            );
        } catch (error: any) {
            const errorMessage =
                error?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className=" text-green-500 bg-transparent"
                    size="icon"
                >
                    <FaCheck />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to accept this application?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <UserLayout member={member} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleAccept}
                        disabled={processing}
                    >
                        {processing ? "Processing..." : "Accept"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function TeamApplication({ team, members }: Props) {
    return (
        <Card className="flex flex-col w-full lg:w-1/2">
            <CardHeader className="flex items-center justify-between">
                <h1 className="font-bold text-xl">
                    Team Applications ({members.length})
                </h1>
            </CardHeader>
            <CardContent>
                {members.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <h2 className="text-gray-500 text-lg">
                            No applications available.
                        </h2>
                    </div>
                ) : (
                    <div className="flex flex-row gap-4 items-center justify-center w-full">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px] text-center">
                                        Name
                                    </TableHead>
                                    <TableHead className="w-[200px] text-center">
                                        Role
                                    </TableHead>
                                    <TableHead className="w-[200px] text-center">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow
                                        key={member.id}
                                        className="items-center justify-center text-center"
                                    >
                                        <TableCell className="text-center">
                                            <UserLayout member={member} />
                                        </TableCell>
                                        <TableCell>
                                            <h1 className="text-center">
                                                {member.role}
                                            </h1>
                                        </TableCell>
                                        <TableCell>
                                            <AcceptApplicationForm
                                                team={team}
                                                member={member}
                                            />
                                            <DeclineApplicationForm
                                                team={team}
                                                member={member}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
