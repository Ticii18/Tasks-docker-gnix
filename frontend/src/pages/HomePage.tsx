import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

interface Task {
  id_task: number;
  title: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const fetchTasks = async () => {
    const res = await fetch(`${backendUrl}/api/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const handleAdd = async (title: string, description: string) => {
    if (editingTask) {
      await fetch(`${backendUrl}/api/tasks/${editingTask.id_task}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      setEditingTask(null);
    } else {
      await fetch(`${backendUrl}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
    }
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${backendUrl}/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 Task Manager</h1>
      <div className="max-w-3xl mx-auto">
        <TaskForm
          onAdd={handleAdd}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
        />
        <div className="mt-6">
          <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
