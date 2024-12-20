type TaskPriority = "Low" | "Medium" | "High";
type TaskStatus = "Open" | "In Progress" | "Completed" | "Overdue";

interface ITask {
    id: string;
    title: string;
    description: string;
    due_date: string;
    priority: TaskPriority;
    status: TaskStatus;
    assigned_to: IUserTeam[];
}
