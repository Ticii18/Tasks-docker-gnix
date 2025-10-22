import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { db } from "./database/db";
import "dotenv/config";
export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

db.initialize()
  .then(() => {
    console.log(" Conectado a la base de datos");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error al conectar la BD:", err));
