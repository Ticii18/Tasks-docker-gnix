import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../pages/HomePage"; // Reuse the Task interface from HomePage

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id_task} {...task} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default TaskList;
