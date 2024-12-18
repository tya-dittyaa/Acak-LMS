import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { MdClose, MdSave, MdSpaceDashboard } from "react-icons/md";
import UpdateAvatarForm from "./Profile/Partials/UpdateAvatarForm";
import DeleteUserForm from "./Profile/Partials/DeleteUserForm";
import UpdatePasswordForm from "./Profile/Partials/UpdatePasswordForm";
import { Separator } from "@/components/ui/separator";
import { RiErrorWarningLine } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Input } from "@/components/ui/input";
import InputError from "@/components/default/InputError";
import { UserAvatarSession } from "@/components/ui/user-avatar";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaCheck, FaTrash } from "react-icons/fa";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

interface Props extends PageProps {}

interface Props {
    mustVerifyEmail: boolean;
    passwordAvailable: boolean;
    status?: string;
    className?: string;
}

export default function TeamInfoDetails(props: Props) {
    const user = usePage().props.auth.user;

    return (
        <MainLayout auth={props.auth} title="Dashboard" hasPadding>
            <PageTitle
                title="Team Details"
                icon={<MdSpaceDashboard className="size-6 md:size-7" />}
            />

            <div className="flex-col">    
            <Card className="flex flex-col lg:h-full">
            <CardHeader>

            </CardHeader>
            <CardContent className="flex flex-col gap-4 w-full">

                <div className="flex flex-row gap-4 mt-3 mb-3">
                    {/* khusus avatar */}
                    <div className="flex flex-col items-center justify-center gap-4 w-1/4 align-middle" >
                        <Avatar className="h-32 w-32 rounded-lg">
                            <AvatarImage className="h-32 w-32 rounded-lg" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"></AvatarImage>
                        </Avatar>
                    </div>

                    {/* khusus desc */}
                    <div className="flex flex-col gap-4 w-3/4">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-xl">Nama team test</h1>
                            <h2 className="text-sm text-gray-500">Token team</h2>
                            <h2 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus ut augue non tincidunt. Fusce lacinia ut mi a euismod. Nullam euismod convallis lacus. Pellentesque finibu </h2>
                        </div>     
                    </div>
                </div>

                <Separator />

                {/* join & applied */}
                <div className="flex flex-col items-center justify-center gap-4 w-full align-middle" >
                    <div className="flex flex-row items-start justify-center gap-4">
                        {/* joined */}
                        <div className="flex flex-col items-center justify-center gap-4 w-1/2">
                            <h1 className="font-bold text-xl">Joined</h1>

                            <div className="flex flex-row gap-4 items-center justify-center">

                            <Table>
                                <TableHeader >
                                    <TableRow>
                                    <TableHead className="w-[200px] text-center">Name</TableHead>
                                    <TableHead className="w-[200px] text-center">Role</TableHead>
                                    <TableHead className="w-[200px] text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="items-center justify-center text-center">
                                        <TableCell className="text-center">
                                            <div className="flex flex-row justify-center items-center mt-2">
                                                <Avatar className="h-12 w-12 rounded-lg">
                                                    <AvatarImage className="h-12 w-12 rounded-lg items-center justify-center" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"></AvatarImage>
                                                </Avatar>

                                                <div className="flex flex-col text-left ml-3">
                                                    <h1 className="font-bold text-l ">Leah</h1>
                                                    <h2 className="text-sm text-gray-500">leah@gmail.com</h2>
                                                </div> 
                                            </div>
                                        </TableCell>
                                        <TableCell>Member</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" className="text-red-500 bg-transparent" size="icon">
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="items-center justify-center text-center">
                                        <TableCell className="text-center">
                                            <div className="flex flex-row justify-center items-center mt-2">
                                                <Avatar className="h-12 w-12 rounded-lg">
                                                    <AvatarImage className="h-12 w-12 rounded-lg items-center justify-center" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"></AvatarImage>
                                                </Avatar>

                                                <div className="flex flex-col text-left ml-3">
                                                    <h1 className="font-bold text-l ">Leah</h1>
                                                    <h2 className="text-sm text-gray-500">leah@gmail.com</h2>
                                                </div> 
                                            </div>
                                        </TableCell>
                                        <TableCell>Member</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" className="text-red-500 bg-transparent" size="icon">
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                            </Table>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="bg-gray-200 h-32 w-[1px]"/>

                        {/* applied */}
                        <div className="flex flex-col items-center justify-center gap-4 w-1/2">
                            <h1 className="font-bold text-xl ">Applied</h1>

                            <Table>
                                <TableHeader >
                                    <TableRow>
                                    <TableHead className="w-[200px] text-center">Name</TableHead>
                                    <TableHead className="w-[200px] text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="items-center justify-start text-center">
                                        <TableCell className="text-center">
                                            <div className="flex flex-row justify-center items-center mt-2">
                                                <Avatar className="h-12 w-12 rounded-lg">
                                                    <AvatarImage className="h-12 w-12 rounded-lg items-center justify-center" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"></AvatarImage>
                                                </Avatar>

                                                <div className="flex flex-col text-left ml-3">
                                                    <h1 className="font-bold text-l ">Leah</h1>
                                                    <h2 className="text-sm text-gray-500">leah@gmail.com</h2>
                                                </div> 
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" className=" text-red-500 bg-transparent" size="icon">
                                                <AiOutlineClose size="large" />
                                            </Button>
                                            <Button variant="ghost" className=" text-green-500 bg-transparent" size="icon">
                                                <FaCheck />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    
                </div>

            </CardContent>
        </Card>
        </div>
        </MainLayout>
    );
}
