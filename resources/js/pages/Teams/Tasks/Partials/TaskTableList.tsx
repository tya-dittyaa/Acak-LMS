import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

export default function TaskTableList({ tasks }: Props) {
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

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Open":
                return "bg-blue-100 text-blue-700";
            case "In Progress":
                return "bg-yellow-100 text-yellow-700";
            case "Completed":
                return "bg-green-100 text-green-700";
            case "Overdue":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-300 text-black";
        }
    };

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
                    {tasks.map((task) => (
                        <TableRow
                            key={task.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                <Badge
                                    className={getPriorityClass(task.priority)}
                                >
                                    {task.priority}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                {task.title}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center gap-2">
                                    {task.assigned_to
                                        .slice(0, 2)
                                        .map((member) => (
                                            <Avatar
                                                key={member.id}
                                                className="w-8 h-8"
                                            >
                                                <AvatarImage
                                                    className="rounded-full"
                                                    src={member.avatar}
                                                    alt={member.name}
                                                />
                                            </Avatar>
                                        ))}
                                    {task.assigned_to.length > 2 && (
                                        <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-sm font-bold text-gray-700 rounded-full">
                                            +{task.assigned_to.length - 2}
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="font-bold text-gray-700 dark:text-gray-300">
                                {task.due_date || "No Due Date"}
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                <Badge className={getStatusClass(task.status)}>
                                    {task.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                <h2>Coming Soon</h2>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
