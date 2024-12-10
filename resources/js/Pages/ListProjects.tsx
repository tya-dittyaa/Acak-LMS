import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import MainLayout from "@/Layouts/Main/MainLayout";
import { PlusIcon } from "lucide-react";
import { DatePickerDemo } from "./ListTasks";
import { Textarea } from "@/Components/ui/textarea";

export function AddProject({ triggerElement }: { triggerElement: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{triggerElement}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                    
                    <DialogDescription>
                        Add your detail Project here!
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
                        <Label htmlFor="member" className="text-right">
                            Member
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
                        <Label htmlFor="username" className="text-right">
                            Due Date
                        </Label>
                        {/* <Input id="duedate" className="col-span-3"/> */}

                        <DatePickerDemo></DatePickerDemo>
                    </div>
                    
                </div>

                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function ListProjects() {
    return (
        <MainLayout title="ListProjects">
            <div className="grid grid-cols-4 gap-7">
                <AddProject
                    triggerElement={
                        <Card className="w-[280px] h-[380px] flex justify-center items-center cursor-pointer border hover:shadow-md transition">
                            <CardContent>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <PlusIcon className="bg-gray-200 rounded-sm w-7 h-7" />
                                    <p className="text-gray-600">Add Project</p>
                                </div>
                            </CardContent>
                        </Card>
                    }
                />

                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Web Programming</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc vel nibh tempor placerat. Maecenas scelerisque </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <p className="">Due Date:</p>
                            <p className="font-bold">29 December 2024</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="mt-3 mb-2">Member:</p>

                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"/>
                                    {/* <AvatarFallback>CN</AvatarFallback> */}
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/2d/84/9c/2d849c195aa63fadd5f6bc7e387e5173.jpg"/>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/5c/6c/be/5c6cbe53b5c589077544fa8878ee194d.jpg"/>
                                </Avatar>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="" variant="secondary">Task Details</Button>
                    </CardFooter>
                </Card>

                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Web Programming</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc vel nibh tempor placerat. Maecenas scelerisque </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <p className="">Due Date:</p>
                            <p className="font-bold">29 December 2024</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="mt-3 mb-2">Member:</p>

                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"/>
                                    {/* <AvatarFallback>CN</AvatarFallback> */}
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/2d/84/9c/2d849c195aa63fadd5f6bc7e387e5173.jpg"/>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/5c/6c/be/5c6cbe53b5c589077544fa8878ee194d.jpg"/>
                                </Avatar>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="" variant="secondary">Task Details</Button>
                    </CardFooter>
                </Card>
                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Web Programming</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc vel nibh tempor placerat. Maecenas scelerisque </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <p className="">Due Date:</p>
                            <p className="font-bold">29 December 2024</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="mt-3 mb-2">Member:</p>

                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"/>
                                    {/* <AvatarFallback>CN</AvatarFallback> */}
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/2d/84/9c/2d849c195aa63fadd5f6bc7e387e5173.jpg"/>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/5c/6c/be/5c6cbe53b5c589077544fa8878ee194d.jpg"/>
                                </Avatar>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="" variant="secondary">Task Details</Button>
                    </CardFooter>
                </Card>

                <Card className="w-[280px]">
                    <CardHeader>
                        <CardTitle>Web Programming</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc vel nibh tempor placerat. Maecenas scelerisque </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <p className="">Due Date:</p>
                            <p className="font-bold">29 December 2024</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="mt-3 mb-2">Member:</p>

                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"/>
                                    {/* <AvatarFallback>CN</AvatarFallback> */}
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/2d/84/9c/2d849c195aa63fadd5f6bc7e387e5173.jpg"/>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/5c/6c/be/5c6cbe53b5c589077544fa8878ee194d.jpg"/>
                                </Avatar>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="" variant="secondary">Task Details</Button>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    )

}