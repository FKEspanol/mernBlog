import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import connectDB from "./config/dbConfig";
import auth from "./routes/auth";
import refreshToken from "./routes/refreshToken";
import logout from "./routes/logout";
import apiRoutes from "./routes/api/home";
import { errorLogs, requestLogs } from "./middleware/logger";
import verifyJWT from "./middleware/verifyJWT";
import credentials from "./middleware/credentials";

const app = express();

connectDB();

app.use(credentials);
app.use(cors());
app.use(requestLogs);
//middleware for json data
app.use(express.json());
// middleware for cookies
app.use(cookieParser());

app.use(errorLogs);
// routes
app.use("/", auth);
app.use("/refresh", refreshToken);
app.use("/logout", logout);

app.use((req, res, next) => {
  console.log(req.headers.origin);
  next();
});

app.use(verifyJWT);
app.use("/", apiRoutes);

mongoose.connection.once("open", () => {
  const serverPortNumber = process.env.SERVER_PORT;

  console.log("Connected to MongoDB");
  app.listen(serverPortNumber, () =>
    console.log(`Server is running on port ${serverPortNumber}`)
  );
});
