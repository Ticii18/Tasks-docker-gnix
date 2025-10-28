"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const db_1 = require("../database/db");
const task_entity_1 = require("../entities/task.entity");
const status_entity_1 = require("../entities/status.entity");
const taskRepo = db_1.db.getRepository(task_entity_1.Task);
const statusRepo = db_1.db.getRepository(status_entity_1.Status);
exports.taskService = {
    // Include the 'status' relation so frontend always receives the status object
    getAll: async () => await taskRepo.find({ relations: ['status'] }),
    getById: async (id) => await taskRepo.findOne({ where: { id_task: id }, relations: ['status'] }),
    create: async (data) => {
        let status = null;
        if (data.statusId) {
            status = await statusRepo.findOneBy({ id_status: data.statusId });
        }
        else if (data.status) {
            status = await statusRepo.findOneBy({ status: data.status });
        }
        // Fallback: try to pick a sensible default (first status row)
        if (!status) {
            status = await statusRepo.findOneBy({});
        }
        if (!status)
            throw new Error("Estado no disponible en la base de datos");
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
        else if (data.status) {
            const status = await statusRepo.findOneBy({ status: data.status });
            if (status)
                task.status = status;
        }
        Object.assign(task, data);
        await taskRepo.save(task);
        // Return the task including relations so callers get the status object
        return await taskRepo.findOne({ where: { id_task: id }, relations: ['status'] });
    },
    delete: async (id) => await taskRepo.delete(id),
};
