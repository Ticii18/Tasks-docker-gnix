import { DataSource } from "typeorm";
import { Task } from "../entities/task.entity";
import { Status } from "../entities/status.entity";
import "dotenv/config";




export const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: true,
  entities: [Task, Status], 
});