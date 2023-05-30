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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const auth_1 = __importDefault(require("./routes/auth"));
const refreshToken_1 = __importDefault(require("./routes/refreshToken"));
const logout_1 = __importDefault(require("./routes/logout"));
const home_1 = __importDefault(require("./routes/api/home"));
const logger_1 = require("./middleware/logger");
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const app = (0, express_1.default)();
(0, dbConfig_1.default)();
app.use(credentials_1.default);
app.use((0, cors_1.default)());
app.use(logger_1.requestLogs);
//middleware for json data
app.use(express_1.default.json());
// middleware for cookies
app.use((0, cookie_parser_1.default)());
app.use(logger_1.errorLogs);
// routes
app.use("/", auth_1.default);
app.use("/refresh", refreshToken_1.default);
app.use("/logout", logout_1.default);
app.use((req, res, next) => {
    console.log(req.headers.origin);
    next();
});
app.use(verifyJWT_1.default);
app.use("/", home_1.default);
mongoose_1.default.connection.once("open", () => {
    const serverPortNumber = process.env.SERVER_PORT;
    console.log("Connected to MongoDB");
    app.listen(serverPortNumber, () => console.log(`Server is running on port ${serverPortNumber}`));
});
