import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

import connectDB from './config/dbConfig';
import router from './routes/signInSignUpForm';
import { errorLogs, requestLogs } from './middleware/logger';

const app = express();

connectDB();


app.use(cors());
app.use(requestLogs)
app.use(express.json());

app.use(errorLogs)
// routes
app.use("/", router);


mongoose.connection.once('open', () => {
    const serverPortNumber = process.env.SERVER_PORT;

    console.log('Connected to MongoDB');
    app.listen(serverPortNumber, () => console.log(`Server is running on port ${serverPortNumber}`));
})

