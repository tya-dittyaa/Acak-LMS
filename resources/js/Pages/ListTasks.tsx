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

export function DatePickerDemo() {
    const [date, setDate] = React.useState<Date>()
   
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
    id: number;
    Task: string;
    member: { MemberName: string };
    priority: { Priority: string };
    Deadline: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    action: { Action: string };
    team: {Description: string};
}

export default function ListTasks() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newTask, setNewTask] = useState({
        Task: "",
        MemberName: "",
        Priority: "",
        Deadline: "",
    });

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await fetch("/tasks");
                if (!response.ok) throw new Error("Failed to fetch tasks");
                const data = await response.json();
                setTasks(data);
                console.log(data);
                setError(null);
            } catch (error) {
                setError("Unable to load tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewTask({ ...newTask, [id]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error("Failed to save task");

            const savedTask = await response.json();
            setTasks([...tasks, savedTask]);
            setNewTask({ Task: "", MemberName: "", Priority: "", Deadline: "" });
        } catch (error) {
            setError("Failed to save task. Please try again.");
        }
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

    return (
        <MainLayout title="ListTasks">
            <div>
                <div className="flex">
                    <div className="flex flex-col mb-0">
                        <h3 className="mb-0">Project</h3>
                        <h1 className="text-3xl font-bold">Web Programming</h1>
                        <div className="flex flex-row">
                            <h2 className="mr-2 italic">Due Date: </h2>
                            <h2 className="mb-5 font-bold italic text-red-400">   31 December 2024</h2>
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

                                        <Textarea className="w-[280px]"></Textarea>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="priority" className="text-right">
                                            Priority
                                        </Label>
                                        
                                        <Select>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Low</SelectItem>
                                            <SelectItem value="1">Mid</SelectItem>
                                            <SelectItem value="2">High</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Assigned To" className="text-right">
                                            Assigned To
                                        </Label>
                                        
                                        <Select>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Karina</SelectItem>
                                            <SelectItem value="1">Dwinovera</SelectItem>
                                            <SelectItem value="2">Mulia</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="assignedby" className="text-right">
                                            Assigned By
                                        </Label>
                                        
                                        <Input className="w-[280px]" disabled type="name" placeholder="Karina" />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="status" className="text-right">
                                            Status
                                        </Label>
                                        
                                        <Select>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Completed</SelectItem>
                                            <SelectItem value="1">In-Progress</SelectItem>
                                            <SelectItem value="2">Pending</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Due Date
                                        </Label>
                                        {/* <Input id="duedate" className="col-span-3"/> */}

                                        <DatePickerDemo></DatePickerDemo>


                                    </div>
                                    
                                </div>

                                <DialogFooter>
                                    <Button type="button">Save</Button>
                                </DialogFooter>
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
                        <TableRow key={task.id || index}>
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
                                        {/* <AvatarFallback>CN</AvatarFallback> */}
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
                                    <IconButton radius="large" size="3" color="green" variant="ghost">
                                        <Check width="20" height="20"/>
                                    </IconButton>
                                    <IconButton radius="large" size="3" color="blue" variant="ghost">
                                        <MagnifyingGlassIcon width="20" height="20"/>
                                    </IconButton>
                                    <IconButton radius="large" size="3" color="crimson" variant="ghost">
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
