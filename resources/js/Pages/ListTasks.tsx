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

export default function ListTasks() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

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
                                    <Button type="submit">Save</Button>
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
                        <TableRow>
                            <TableCell><Badge className="bg-lime-400 text-black rounded-xl" variant="outline">Low</Badge></TableCell>
                            <TableCell>Pembuatan Home Page</TableCell>
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
                            <TableCell className="font-bold">30-11-2024</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-700 rounded-xl" variant="secondary">Completed</Badge></TableCell>
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
                        <TableRow>
                            <TableCell><Badge className="bg-amber-400 text-black rounded-xl" variant="outline">Mid</Badge></TableCell>
                            <TableCell>Pembuatan List Tasks Page</TableCell>
                            <TableCell>
                            <div className="flex justify-center items-center gap-2">
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
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center items-center gap-2">
                                    <Avatar>
                                        <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/ca/84/57/ca8457a0fb79de385747dc574ce0846d.jpg"/>
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell className="font-bold">30-11-2024</TableCell>
                            <TableCell><Badge className="bg-yellow-100 text-yellow-700 rounded-xl" variant="secondary">In-Progress</Badge></TableCell>
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
                        <TableRow>
                            <TableCell><Badge className="bg-red-400 text-black rounded-xl" variant="outline">High</Badge></TableCell>
                            <TableCell>Pembuatan List Projects Page</TableCell>
                            <TableCell>
                            <div className="flex justify-center items-center gap-2">
                                    <Avatar>
                                        <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"/>
                                        {/* <AvatarFallback>CN</AvatarFallback> */}
                                    </Avatar>
                                    <Avatar>
                                        <AvatarImage className="size-9 rounded-full" src="https://i.pinimg.com/736x/5c/6c/be/5c6cbe53b5c589077544fa8878ee194d.jpg"/>
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
                            <TableCell className="font-bold">30-11-2024</TableCell>
                            <TableCell><Badge className="bg-red-100 text-red-700 rounded-xl" variant="secondary">Pending</Badge></TableCell>
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
                    </TableBody>
                </Table>
            </div>
        </MainLayout>
    );
}