import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    tasks: ITask[];
}

export default function TaskTableList(props: Props) {
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full text-center bg-white dark:bg-gray-900">
                <TableHeader className="bg-gray-200 dark:bg-gray-800">
                    <TableRow>
                        <TableHead className="text-center dark:text-gray-200">
                            Priority
                        </TableHead>
                        <TableHead className="text-center dark:text-gray-200">
                            Title
                        </TableHead>
                        <TableHead className="text-center dark:text-gray-200">
                            Assigned To
                        </TableHead>
                        <TableHead className="text-center dark:text-gray-200">
                            Due Date
                        </TableHead>
                        <TableHead className="text-center dark:text-gray-200">
                            Status
                        </TableHead>
                        <TableHead className="text-center dark:text-gray-200">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {props.tasks.map((task) => (
                        <TableRow
                            key={task.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                {/* Add priority logic here */}
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                {task.title}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            className="size-9 rounded-full"
                                            src="https://i.pinimg.com/736x/60/eb/d1/60ebd1a8268d230c60d0bbf42aa7bd4f.jpg"
                                            alt="Avatar"
                                        />
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                {task.due_date || "No Due Date"}
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                {/* Add status logic here */}
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                {/* Add action buttons here */}
                                Hello
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
