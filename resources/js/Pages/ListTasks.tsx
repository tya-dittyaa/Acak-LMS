import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import MainLayout from "@/Layouts/Main/MainLayout";

export default function ListTasks() {
    return (
        <MainLayout title="ListTasks">
            <div className="">
                <div className="flex">
                        <h1 className="text-3xl mb-5 font-bold">Walawe :b</h1>

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
                                        <Label htmlFor="subtask" className="text-right">
                                            Subtask
                                        </Label>

                                        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3"/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Username
                                        </Label>
                                        
                                        <Input id="username" defaultValue="@peduarte" className="col-span-3"/>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="submit">Save</Button>
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
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell><Badge className="bg-lime-400 text-black" variant="outline">Low</Badge></TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell className="text-center">TEST</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge className="bg-amber-400 text-black" variant="outline">Mid</Badge></TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell className="text-center">TEST</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Badge className="bg-red-400 text-black" variant="outline">High</Badge></TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>TEST</TableCell>
                            <TableCell className="text-center">TEST</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </MainLayout>
    );
}