import React, { useEffect, useState } from "react";

// Define the Task type to ensure it matches the expected structure
export interface Task {
    title: string;
    description: string;
    status: number;
}

interface TaskFormProps {
    onAdd: (title: string, description: string, status: number) => void;
    initialData?: Task | null;
    onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, initialData, onCancel }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1); // Default status

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setStatus(initialData.status);
        } else {
            setTitle("");
            setDescription("");
            setStatus(1);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        onAdd(title, description, status);
        setTitle("");
        setDescription("");
        setStatus(1);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-4 rounded-lg flex flex-col gap-3 shadow-md"
        >
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <select
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2"
            >
                <option value={1}>Pending</option>
                <option value={2}>In Progress</option>
                <option value={3}>Completed</option>
            </select>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 font-medium"
                >
                    {initialData ? "Update Task" : "Add Task"}
                </button>
                {initialData && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg py-2 px-4"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
