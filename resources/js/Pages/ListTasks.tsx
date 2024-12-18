import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import MainLayout from "@/Layouts/Main/MainLayout";
import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Theme, IconButton} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { CalendarIcon, Check, PlusIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Calendar } from "@/Components/ui/calendar";
import { Textarea } from "@/Components/ui/textarea";
import { useState, useEffect } from 'react';
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { useRef } from "react";

interface DatePickerDemoProps {
    date: Date | undefined;
    setDate: (value: Date | undefined) => void;
}

export function DatePickerDemo({ date, setDate }: DatePickerDemoProps) {
   
    return (
      <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-[280px] justify-start text-left font-normal flex items-center gap-2",
                !date && "text-muted-foreground"
            )}
            >
            <CalendarIcon className="w-4 h-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>

        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
    

interface Task {
    TaskId: number;
    Task: string;
    member: { MemberId: number };
    priority: { Priority: string };
    Deadline: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    action: { Action: string };
    team: {TeamId: number};
}

interface Member {
    MemberId: number;
    MemberName: string;
}

interface Team {
    TeamId: number;
    Description: string;
}

interface TeamDetails {
    TeamId: number;
    MemberId: number;
}

interface Priority {
    PriorityId: number;
    Priority: string;
}

export default function ListTasks() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [membersInTeam, setMembersInTeam] = useState<Member[]>([]);
    const [priorityName, setPriority] = useState<Priority[]>([]);
    const TeamId = 1; 
    const { data, setData, post, reset, errors, processing, put } = useForm({
        Task: "",
        CreatedAt: new Date(),
        MemberId: "",
        UpdatedAt: new Date(),
        PriorityId: "",
        ActionId: 1,
        Deadline: "",
        TeamId
    });


    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const taskResponse = await fetch("/tasks");
                if (!taskResponse.ok) throw new Error("Failed to fetch tasks");
                const taskData: Task[] = await taskResponse.json();

                const memberResponse = await fetch("/members");
                if (!memberResponse.ok) throw new Error("Failed to fetch members");
                const memberData: Member[] = await memberResponse.json();

                const teamResponse = await fetch("/teams");
                if (!teamResponse.ok) throw new Error("Failed to fetch teams");
                const teamData: Team[] = await teamResponse.json();

                const teamDetailsResponse = await fetch("/teamDetails");
                if(!teamDetailsResponse.ok) throw new Error("Failed to fetch team details");
                const teamDetailsData: TeamDetails[] = await teamDetailsResponse.json();

                const filteredTeamDetails = teamDetailsData.filter(
                    (teamDetail) => teamDetail.TeamId === TeamId
                );

                const membersInTeam = filteredTeamDetails.map((teamDetail) => {
                    const member = memberData.find((m) => m.MemberId === teamDetail.MemberId);
                    return member ? { MemberId: member.MemberId, MemberName: member.MemberName } : null;
                }).filter(Boolean) as Member[];

                setMembersInTeam(membersInTeam);

                const priorityResponse = await fetch("/priority");
                if (!priorityResponse.ok) throw new Error("Failed to fetch team details");
                const priorityData: Priority[] = await priorityResponse.json();
                setPriority(priorityData);

                const combinedData = taskData.map((task: Task) => ({
                    ...task,
                    id: task.TaskId,
                    MemberDescription: memberData.find(
                        (member) => member.MemberId === task.member.MemberId
                    )?.MemberName || "N/A",
                    TeamDescription: teamData.find(
                        (team) => team.TeamId === task.team.TeamId
                    )?.Description || "N/A",
                }));

                setTasks(combinedData);
                // console.log(combinedData);
                setError(null);
            } catch (error) {
                setError("Unable to load tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("tasks.store"), {
            onSuccess: () => {
                toast.success("Task created successfully!");
                reset();
                window.location.reload();
            },
            onError: (errors) => {
                toast.error("Failed to create task. Please check the form.");
                console.error(errors);
            }
        });
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const getPriorityClass = (priority: string | null) => {
        if (!priority) return "bg-gray-300 text-black";

        switch (priority) {
            case "Low":
                return "bg-lime-400 text-black";
            case "Mid":
                return "bg-amber-400 text-black";
            case "High":
                return "bg-red-400 text-black";
            default:
                return "bg-gray-300 text-black";
        }
    };

    const handleActionUpdate = (taskId: number, actionId: number) => {
        setData("ActionId", actionId);
        put(route("tasks.update", taskId), {
            onSuccess: () => {
                toast.success("Task action updated successfully!");
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.TaskId === taskId
                            ? { ...task, action: { ...task.action, Action: actionId === 3 ? "Completed" : "Deleted" } }
                            : task
                    )
                );
                window.location.reload();
            },
            onError: (errors) => {
                toast.error("Failed to update task action.");
                console.error(errors);
            },
        });
    };



    return (
        <MainLayout title="ListTasks">
            <div>
                <div className="flex">
                    <div className="flex flex-col mb-0">
                        <h3 className="mb-0">Project</h3>
                        <h1 className="text-3xl font-bold">Web Programming</h1>
                        <div className="flex flex-row">
                            <h2 className="mr-2 italic">Due Date: </h2>
                            <h2 className="mb-5 font-bold italic text-red-400">31 December 2024</h2>
                        </div>
                        <div className="w-25">
                            <p className="text-gray-500 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc vel consectetur adipiscing elit. Proin vitae nunc vel consectetur nibh tempor placerat. Maecenas scelerisque laoreet mauris, at sollicitudin turpis. Etiam suscipit felis felis, sit amet varius diam dignissim et. Nullam molestie ligula eu ipsum consectetur posuere. Etiam congue sapien a dolor rutrum, eu maximus ligula sollicitudin. Mauris nec rutrum ante. Sed </p>
                        </div>
                    </div>
                        
                    <div className="ml-auto">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="" variant="outline">Add Task</Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Add Task</DialogTitle>
                                    <DialogDescription>
                                        Add your detail task here!
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="Task"
                                            value={data.Task}
                                            onChange={(e) => setData("Task", e.target.value)}
                                            className="w-[280px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="priority" className="text-right">
                                            Priority
                                        </Label>
                                        
                                        <Select onValueChange={(value) => setData("PriorityId", value)}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                            <SelectContent>
                                                {priorityName.map((priority) => (
                                                    <SelectItem key={priority.PriorityId} value={String(priority.PriorityId)}>
                                                        {priority.Priority}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Assigned To" className="text-right">
                                            Assigned To
                                        </Label>
                                        
                                        <Select onValueChange={(value) => setData("MemberId", value)}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                            <SelectContent>
                                                {membersInTeam.map((member) => (
                                                    <SelectItem key={member.MemberId} value={String(member.MemberId)}>
                                                        {member.MemberName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Due Date
                                        </Label>

                                        <DatePickerDemo
                                            date={data.Deadline ? new Date(data.Deadline) : undefined}
                                            setDate={(value) =>
                                                setData("Deadline", value ? format(value, "yyyy-MM-dd") : "")
                                            }
                                        />

                                    </div>
                                    
                                </div>

                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        Save
                                    </Button>
                                </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-500 mb-3">Tasks</h2>

                <Table className="text-center">
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead className="text-center">Priority</TableHead>
                            <TableHead className="text-center">Description</TableHead>
                            <TableHead className="text-center">Assigned To</TableHead>
                            <TableHead className="text-center">Assigned By</TableHead>
                            <TableHead className="text-center">Due Date</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow key={task.TaskId || index}>
                            <TableCell>
                                    <Badge className={`${getPriorityClass(task.priority?.Priority)}`}>
                                        {task.priority?.Priority || "N/A"}
                                    </Badge>
                                </TableCell>
                            <TableCell>{task.Task || "N/A"}</TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center gap-2">
                                    <Avatar>
                                        <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"/>
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center items-center gap-2">
                                    <Avatar>
                                        <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/ca/84/57/ca8457a0fb79de385747dc574ce0846d.jpg"/>
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell className="font-bold">{task.Deadline || "-"}</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-700 rounded-xl" variant="secondary">{task.action?.Action || "N/A"}</Badge></TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center gap-2">
                                    <IconButton radius="large" size="3" color="green" variant="ghost" onClick={() => handleActionUpdate(task.TaskId, 3)}>
                                        <Check width="20" height="20"/>
                                    </IconButton>
                                    <IconButton radius="large" size="3" color="crimson" variant="ghost" onClick={() => handleActionUpdate(task.TaskId, 2)}>
                                        <Trash width="20" height="20"/>
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                         ))}
                    </TableBody>
                </Table>
            </div>
        </MainLayout>
    );
}
