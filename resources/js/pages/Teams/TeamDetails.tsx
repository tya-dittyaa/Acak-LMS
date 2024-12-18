import PageTitle from "@/components/ui/page-title";
import MainLayout from "@/layouts/Main/HomeLayout";
import { PageProps } from "@/types";
import { MdSpaceDashboard } from "react-icons/md";
import TeamApplication from "./Partials/TeamApplication";
import TeamInformation from "./Partials/TeamInformation";
import TeamMember from "./Partials/TeamMember";

interface Props extends PageProps {
    team: ITeam;
    teamApplications: IUserTeam[];
    teamMembers: IUserTeam[];
}

export default function TeamDetails(props: Props) {
    const { team, teamApplications, teamMembers } = props;

    return (
        <MainLayout auth={props.auth} title="Dashboard" hasPadding>
            <PageTitle
                title="Team Details"
                icon={<MdSpaceDashboard className="size-6 md:size-7" />}
            />

            <div className="flex flex-col gap-4">
                <TeamInformation team={team} />

                <div className="flex flex-col lg:flex-row gap-4">
                    <TeamMember team={team} members={teamMembers} />
                    <TeamApplication team={team} members={teamApplications} />
                </div>
            </div>
        </MainLayout>
    );
}

// function karina() {
//     return (<div className="flex-col">
//         <Card className="flex flex-col lg:h-full">
//             <CardHeader></CardHeader>
//             <CardContent className="flex flex-col gap-4 w-full">
//                 <div className="flex flex-col lg:flex-row gap-4 mt-3 mb-3">
//                     {/* Avatar */}
//                     <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/4">
//                         <Avatar className="h-32 w-32 rounded-lg">
//                             <AvatarImage
//                                 className="h-32 w-32 rounded-lg"
//                                 src={team.icon ?? ""}
//                             ></AvatarImage>
//                             <AvatarFallback>
//                                 {team.name.charAt(0).toUpperCase()}
//                             </AvatarFallback>
//                         </Avatar>
//                     </div>

//                     {/* Description */}
//                     <div className="flex flex-col gap-4 w-full lg:w-3/4">
//                         <div className="flex flex-col gap-2">
//                             <h1 className="font-bold text-xl">{team.name}</h1>
//                             <h2 className="text-sm text-gray-500">
//                                 {team.code}
//                             </h2>
//                             <h2 className="text-sm">{team.description}</h2>
//                         </div>
//                     </div>
//                 </div>

//                 <Separator />

//                 {/* Join & Applied */}
//                 <div className="flex flex-col items-center justify-center gap-4 w-full align-middle">
//                     <div className="flex flex-col lg:flex-row items-start justify-center gap-4 w-full">
//                         {/* Joined */}
//                         <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
//                             <h1 className="font-bold text-xl">Joined</h1>

//                             <div className="flex flex-row gap-4 items-center justify-center w-full">
//                                 <Table className="w-full">
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead className="w-[200px] text-center">
//                                                 Name
//                                             </TableHead>
//                                             <TableHead className="w-[200px] text-center">
//                                                 Role
//                                             </TableHead>
//                                             <TableHead className="w-[200px] text-center">
//                                                 Action
//                                             </TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {teamMembers.map((member) => (
//                                             <TableRow className="items-center justify-center text-center">
//                                                 <TableCell className="text-center">
//                                                     <div className="flex flex-row justify-center items-center mt-2">
//                                                         <Avatar className="h-12 w-12 rounded-lg">
//                                                             <AvatarImage
//                                                                 className="h-12 w-12 rounded-lg items-center justify-center"
//                                                                 src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"
//                                                             ></AvatarImage>
//                                                         </Avatar>

//                                                         <div className="flex flex-col text-left ml-3">
//                                                             <h1 className="font-bold text-l ">
//                                                                 {member.name}
//                                                             </h1>
//                                                             <h2 className="text-sm text-gray-500">
//                                                                 {member.email}
//                                                             </h2>
//                                                         </div>
//                                                     </div>
//                                                 </TableCell>
//                                                 <TableCell>Member</TableCell>
//                                                 <TableCell>
//                                                     <Button
//                                                         variant="ghost"
//                                                         className="text-red-500 bg-transparent"
//                                                         size="icon"
//                                                     >
//                                                         <FaTrash />
//                                                     </Button>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </div>
//                         </div>

//                         {/* Applied */}
//                         <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
//                             <h1 className="font-bold text-xl">Applied</h1>

//                             <Table className="w-full">
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead className="w-[200px] text-center">
//                                             Name
//                                         </TableHead>
//                                         <TableHead className="w-[200px] text-center">
//                                             Action
//                                         </TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     <TableRow className="items-center justify-start text-center">
//                                         <TableCell className="text-center">
//                                             <div className="flex flex-row justify-center items-center mt-2">
//                                                 <Avatar className="h-12 w-12 rounded-lg">
//                                                     <AvatarImage
//                                                         className="h-12 w-12 rounded-lg items-center justify-center"
//                                                         src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"
//                                                     ></AvatarImage>
//                                                 </Avatar>

//                                                 <div className="flex flex-col text-left ml-3">
//                                                     <h1 className="font-bold text-l ">
//                                                         Leah
//                                                     </h1>
//                                                     <h2 className="text-sm text-gray-500">
//                                                         leah@gmail.com
//                                                     </h2>
//                                                 </div>
//                                             </div>
//                                         </TableCell>
//                                         <TableCell>
//                                             <Button
//                                                 variant="ghost"
//                                                 className=" text-red-500 bg-transparent"
//                                                 size="icon"
//                                             >
//                                                 <AiOutlineClose size="large" />
//                                             </Button>
//                                             <Button
//                                                 variant="ghost"
//                                                 className=" text-green-500 bg-transparent"
//                                                 size="icon"
//                                             >
//                                                 <FaCheck />
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableBody>
//                             </Table>
//                         </div>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     </div>;)
// }
