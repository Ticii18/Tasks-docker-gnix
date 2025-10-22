import { Request, Response } from "express";
import { taskService } from "../services/task.service";

export const taskController = {
    getAll: async (_req: Request, res: Response) => {
        const tasks = await taskService.getAll();
        res.json(tasks);
    },

    getById: async (req: Request, res: Response) => {
        const task = await taskService.getById(Number(req.params.id));
        if (!task) return res.status(404).json({ message: "No encontrada" });
        res.json(task);
    },

    create: async (req: Request, res: Response) => {
        try {
            const newTask = await taskService.create(req.body);
            res.status(201).json(newTask);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const updated = await taskService.update(Number(req.params.id), req.body);
            res.json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        await taskService.delete(Number(req.params.id));
        res.json({ message: "Eliminada correctamente" });
    },
};
