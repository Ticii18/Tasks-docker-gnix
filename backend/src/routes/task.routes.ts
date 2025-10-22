import { Router } from "express";
import { taskController } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", taskController.getAll);
taskRoutes.get("/:id", taskController.getById);
taskRoutes.post("/", taskController.create);
taskRoutes.put("/:id", taskController.update);
taskRoutes.delete("/:id", taskController.delete);

export default taskRoutes;
