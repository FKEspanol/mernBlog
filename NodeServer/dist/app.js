"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const createUser_1 = __importDefault(require("./routes/createUser"));
const logger_1 = require("./middleware/logger");
const app = (0, express_1.default)();
(0, dbConfig_1.default)();
app.use((0, cors_1.default)());
app.use(logger_1.requestLogs);
app.use(express_1.default.json());
app.use(logger_1.errorLogs);
// routes
app.use("/", createUser_1.default);
mongoose_1.default.connection.once('open', () => {
    const serverPortNumber = process.env.NODEJS_SERVER_PORT_NUMBER;
    console.log('Connected to MongoDB');
    app.listen(serverPortNumber, () => console.log(`Server is running on port ${serverPortNumber}`));
});
