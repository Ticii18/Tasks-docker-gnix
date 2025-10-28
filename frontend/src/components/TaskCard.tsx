import React from "react";

interface TaskCardProps {
    id_task: number;
    title: string;
    description: string;
    // status can be number, string or an object (relation) depending on backend
    status: any;
    onDelete: (id: number) => void;
    onEdit: (task: { id_task: number; title: string; description: string; status?: any }) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id_task, title, description, status, onDelete, onEdit }) => {
    const normalized = (() => {
        if (status == null) return null;
        if (typeof status === 'string') return status.toLowerCase();
        if (typeof status === 'number') return status;
        if (typeof status === 'object') {
            if ('status' in status && typeof status.status === 'string') return status.status.toLowerCase();
            if ('id_status' in status && typeof status.id_status === 'number') return status.id_status;
            if ('id' in status && typeof status.id === 'number') return status.id;
        }
        return null;
    })();

    const isPending = typeof normalized === 'string' ? normalized.includes('pend') : (typeof normalized === 'number' ? normalized === 1 : false);

    const containerClasses = `shadow-md rounded-lg p-4 flex flex-col gap-2 ${isPending ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-green-50 border-l-4 border-green-400'}`;
    const badgeClasses = `${isPending ? 'bg-yellow-500 text-yellow-900' : 'bg-green-600 text-white'} text-xs font-semibold px-2 py-0.5 rounded-full`;

    const badgeText = typeof normalized === 'string' ? (normalized.charAt(0).toUpperCase() + normalized.slice(1)) : (isPending ? 'Pending' : 'Complete');

    return (
        <div className={containerClasses} role="article" aria-labelledby={`task-${id_task}-title`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 id={`task-${id_task}-title`} className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-600 mt-1">{description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={badgeClasses} aria-label={isPending ? 'Pending' : 'Complete'}>
                        {badgeText}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 justify-end mt-3">
                <button
                    onClick={() => onEdit({ id_task, title, description, status })}
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
