import { Request, Response} from 'express'
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from 'path';
import getDate from "../helpers/formatTime";


const logEvents = async (message: string, logFile: string) => {
    try {
        let date = getDate();
        const logItem = `${date}\t${uuidv4()}\t${message}`;

        if(!fs.existsSync(path.join(__dirname, '../../', 'logs'))) {
            await fs.promises.mkdir(path.join(__dirname, '../../', 'logs'));
            await fs.promises.appendFile(path.join(__dirname, '../../', 'logs', logFile), logItem)
        } else {
            await fs.promises.appendFile(path.join(__dirname, '../../', 'logs', logFile), logItem)
        }
    } catch (error) {
        console.error(error);
    }
}

const requestLogs = (req: Request, res: Response, next: Function) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`, 'requestLogs.txt');
    next()
}

const errorLogs = (err: Error, req: Request, res: Response, next: Function) => {
    logEvents(`${err.name}\t${err.message}'\n`, 'errorLogs.txt')
    next();
}

export {
    requestLogs, errorLogs
}