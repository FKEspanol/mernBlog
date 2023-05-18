"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogs = exports.requestLogs = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const formatTime_1 = __importDefault(require("../helpers/formatTime"));
const logEvents = (message, logFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let date = (0, formatTime_1.default)();
        const logItem = `${date}\t${(0, uuid_1.v4)()}\t${message}`;
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, '../../', 'logs'))) {
            yield fs_1.default.promises.mkdir(path_1.default.join(__dirname, '../../', 'logs'));
            yield fs_1.default.promises.appendFile(path_1.default.join(__dirname, '../../', 'logs', logFile), logItem);
        }
        else {
            yield fs_1.default.promises.appendFile(path_1.default.join(__dirname, '../../', 'logs', logFile), logItem);
        }
    }
    catch (error) {
        console.error(error);
    }
});
const requestLogs = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`, 'requestLogs.txt');
    next();
};
exports.requestLogs = requestLogs;
const errorLogs = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}'\n`, 'errorLogs.txt');
    next();
};
exports.errorLogs = errorLogs;
