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
    Task: string;
    MemberName: string;
    Priority: string;
    Deadline: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    Action: string;
}

export default function ListTasks() {
    const [today, setToday] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        Task: '',
        MemberName: '',
        Priority: 'Low',
        Deadline: '',
        Action: 'Open',
    });

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        setToday(formattedDate);

        fetch('http://localhost:1234/basic.php')
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    setTasks(data);
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewTask(prevTask => ({ ...prevTask, [id]: value }));
    };

    const handleSave = () => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTask({
            Task: '',
            MemberName: '',
            Priority: 'Low',
            Deadline: today,
            Action: 'Open',
        });
    };

    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'Low':
                return 'bg-lime-400 text-black';
            case 'Mid':
                return 'bg-amber-400 text-black';
            case 'High':
                return 'bg-red-400 text-black';
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
                                        <Input id="Task" value={newTask.Task} onChange={handleInputChange} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="MemberName" className="text-right">
                                            Member Name
                                        </Label>
                                        <Input id="MemberName" value={newTask.MemberName} onChange={handleInputChange} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Priority" className="text-right">
                                            Priority
                                        </Label>
                                        <Input id="Priority" value={newTask.Priority} onChange={handleInputChange} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Deadline" className="text-right">
                                            Deadline
                                        </Label>
                                        <Input id="Deadline" type="date" value={newTask.Deadline} onChange={handleInputChange} className="col-span-3" />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="button" onClick={handleSave}>Save</Button>
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
                            <TableRow key={index}>
                                <TableCell>
                                    <Badge className={getPriorityClass(task.Priority)} variant="outline">
                                        {task.Priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>{task.Task}</TableCell>
                                <TableCell>{task.CreatedAt}</TableCell>
                                <TableCell>{task.MemberName}</TableCell>
                                <TableCell>{task.UpdatedAt}</TableCell>
                                <TableCell>{task.Deadline}</TableCell>
                                <TableCell>{task.Action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </MainLayout>
    );
}
