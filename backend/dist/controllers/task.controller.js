"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const task_service_1 = require("../services/task.service");
exports.taskController = {
    getAll: async (_req, res) => {
        const tasks = await task_service_1.taskService.getAll();
        res.json(tasks);
    },
    getById: async (req, res) => {
        const task = await task_service_1.taskService.getById(Number(req.params.id));
        if (!task)
            return res.status(404).json({ message: "No encontrada" });
        res.json(task);
    },
    create: async (req, res) => {
        try {
            const newTask = await task_service_1.taskService.create(req.body);
            res.status(201).json(newTask);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updated = await task_service_1.taskService.update(Number(req.params.id), req.body);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        await task_service_1.taskService.delete(Number(req.params.id));
        res.json({ message: "Eliminada correctamente" });
    },
};
