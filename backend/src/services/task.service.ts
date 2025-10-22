import { db } from "../database/db";
import { Task } from "../entities/task.entity";
import { Status } from "../entities/status.entity";

const taskRepo = db.getRepository(Task);
const statusRepo = db.getRepository(Status);

export const taskService = {
    getAll: async () => await taskRepo.find(),

    getById: async (id: number) =>
        await taskRepo.findOne({ where: { id_task: id } }),

    create: async (data: {
        title: string;
        description: string;
        statusId: number;
    }) => {
        const status = await statusRepo.findOneBy({ id_status: data.statusId });
        if (!status) throw new Error("Estado no válido");

        const task = taskRepo.create({
            title: data.title,
            description: data.description,
            status,
        });
        return await taskRepo.save(task);
    },

    update: async (id: number, data: Partial<Task> & { statusId?: number }) => {
        const task = await taskRepo.findOne({ where: { id_task: id } });
        if (!task) throw new Error("Tarea no encontrada");

        if (data.statusId) {
            const status = await statusRepo.findOneBy({ id_status: data.statusId });
            if (status) task.status = status;
        }

        Object.assign(task, data);
        return await taskRepo.save(task);
    },

    delete: async (id: number) => await taskRepo.delete(id),
};
