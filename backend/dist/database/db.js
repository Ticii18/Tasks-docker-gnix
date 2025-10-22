"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const status_entity_1 = require("../entities/status.entity");
require("dotenv/config");
exports.db = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [task_entity_1.Task, status_entity_1.Status],
});
