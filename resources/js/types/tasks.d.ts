type TaskPriority = "Low" | "Medium" | "High";
type TaskStatus = "Open" | "In Progress" | "Completed" | "Overdue";

interface ITaskData {
    id: string;
    title: string;
    description: string;
    due_date: string;
    priority: TaskPriority;
    status: TaskStatus;
    assigned_to: IUserTeam[];
}
