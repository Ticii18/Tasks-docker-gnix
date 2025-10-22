import React, { useEffect, useState } from "react";

interface TaskFormProps {
    onAdd: (title: string, description: string) => void;
    initialData?: { title: string; description: string } | null;
    onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, initialData, onCancel }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        onAdd(title, description);
        setTitle("");
        setDescription("");
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
