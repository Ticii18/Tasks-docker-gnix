import React from "react";
import TaskCard from "./TaskCard";
import type { Task } from "../pages/HomePage"; 

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (task: { id_task: number; title: string; description: string }) => void;
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
