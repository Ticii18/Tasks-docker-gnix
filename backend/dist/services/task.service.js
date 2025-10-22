"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const db_1 = require("../database/db");
const task_entity_1 = require("../entities/task.entity");
const status_entity_1 = require("../entities/status.entity");
const taskRepo = db_1.db.getRepository(task_entity_1.Task);
const statusRepo = db_1.db.getRepository(status_entity_1.Status);
exports.taskService = {
    getAll: async () => await taskRepo.find(),
    getById: async (id) => await taskRepo.findOne({ where: { id_task: id } }),
    create: async (data) => {
        const status = await statusRepo.findOneBy({ id_status: data.statusId });
        if (!status)
            throw new Error("Estado no válido");
        const task = taskRepo.create({
            title: data.title,
            description: data.description,
            status,
        });
        return await taskRepo.save(task);
    },
    update: async (id, data) => {
        const task = await taskRepo.findOne({ where: { id_task: id } });
        if (!task)
            throw new Error("Tarea no encontrada");
        if (data.statusId) {
            const status = await statusRepo.findOneBy({ id_status: data.statusId });
            if (status)
                task.status = status;
        }
        Object.assign(task, data);
        return await taskRepo.save(task);
    },
    delete: async (id) => await taskRepo.delete(id),
};
