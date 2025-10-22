import React from "react";

interface TaskCardProps {
    id_task: number;
    title: string;
    description: string;
    onDelete: (id: number) => void;
    onEdit: (task: { id_task: number; title: string; description: string }) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id_task, title, description, onDelete, onEdit }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
            <div className="flex gap-2 justify-end mt-2">
                <button
                    onClick={() => onEdit({ id_task, title, description })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(id_task)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
