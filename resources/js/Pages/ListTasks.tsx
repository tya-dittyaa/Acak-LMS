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
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import MainLayout from "@/Layouts/Main/MainLayout";
import { useState, useEffect } from 'react';

interface Task {
    id: number;
    Task: string;
    member: { MemberName: string };
    priority: { Priority: string };
    Deadline: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    action: { Action: string };
}

export default function ListTasks() {
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
            <div className="">
                <div className="flex">
                    <h1 className="text-3xl mb-5 font-bold">Tasks</h1>

                    <div className="ml-auto">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="" variant="outline">Add Task</Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Task</DialogTitle>
                                    <DialogDescription>
                                        Add your task here, whether your member, priority, etc.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Task" className="text-right">
                                            Task
                                        </Label>
                                        <Input id="Task"  className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="MemberName" className="text-right">
                                            Member Name
                                        </Label>
                                        <Input id="MemberName" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Priority" className="text-right">
                                            Priority
                                        </Label>
                                        <Input id="Priority" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Deadline" className="text-right">
                                            Deadline
                                        </Label>
                                        <Input id="Deadline" type="date" className="col-span-3" />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="button">Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Table>
                    <TableCaption>A list of this project tasks</TableCaption>
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead>Priority</TableHead>
                            <TableHead>Subtask</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Member</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead>Action</TableHead>
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
                                <TableCell>{task.CreatedAt || "-"}</TableCell>
                                <TableCell>{task.member?.MemberName || "N/A"}</TableCell>
                                <TableCell>{task.UpdatedAt || "-"}</TableCell>
                                <TableCell>{task.Deadline || "-"}</TableCell>
                                <TableCell>{task.action?.Action || "N/A"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </MainLayout>
    );
}
