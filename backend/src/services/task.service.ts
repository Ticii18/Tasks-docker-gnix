import { db } from "../database/db";
import { Task } from "../entities/task.entity";
import { Status } from "../entities/status.entity";

const taskRepo = db.getRepository(Task);
const statusRepo = db.getRepository(Status);

export const taskService = {
    // Include the 'status' relation so frontend always receives the status object
    getAll: async () => await taskRepo.find({ relations: ['status'] }),

    getById: async (id: number) =>
        await taskRepo.findOne({ where: { id_task: id }, relations: ['status'] }),

    create: async (data: {
        title: string;
        description: string;
        // Accept either statusId (number) or status (string) for flexibility
        statusId?: number;
        status?: string;
    }) => {
        let status = null as Status | null;

        if (data.statusId) {
            status = await statusRepo.findOneBy({ id_status: data.statusId });
        } else if (data.status) {
            status = await statusRepo.findOneBy({ status: data.status });
        }

        // Fallback: try to pick a sensible default (first status row)
        if (!status) {
            status = await statusRepo.findOneBy({});
        }

        if (!status) throw new Error("Estado no disponible en la base de datos");

        const task = taskRepo.create({
            title: data.title,
            description: data.description,
            status,
        });
        return await taskRepo.save(task);
    },

    update: async (id: number, data: Partial<Task> & { statusId?: number; status?: string }) => {
        const task = await taskRepo.findOne({ where: { id_task: id } });
        if (!task) throw new Error("Tarea no encontrada");
        if (data.statusId) {
            const status = await statusRepo.findOneBy({ id_status: data.statusId });
            if (status) task.status = status;
        } else if (data.status) {
            const status = await statusRepo.findOneBy({ status: data.status });
            if (status) task.status = status;
        }

        Object.assign(task, data);
        await taskRepo.save(task);
        // Return the task including relations so callers get the status object
        return await taskRepo.findOne({ where: { id_task: id }, relations: ['status'] });
    },

    delete: async (id: number) => await taskRepo.delete(id),
};
