import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';

import connectDB from './config/dbConfig';
import router from './routes/createUser';


connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/", router);

mongoose.connection.once('open', () => {
    const serverPortNumber = process.env.NODEJS_SERVER_PORT_NUMBER;

    console.log('Connected to MongoDB');
    app.listen(serverPortNumber, () => console.log(`Server is running on port ${serverPortNumber}`));
})

