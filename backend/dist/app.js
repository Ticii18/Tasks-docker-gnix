"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const db_1 = require("./database/db");
require("dotenv/config");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/api/tasks", task_routes_1.default);
const PORT = process.env.PORT || 4000;
db_1.db.initialize()
    .then(() => {
    console.log(" Conectado a la base de datos");
    exports.app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
})
    .catch((err) => console.error("Error al conectar la BD:", err));
