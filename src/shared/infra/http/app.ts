import "reflect-metadata";
import express from "express";

import { routes } from "./routes";
import databaseConnection from "../database/typeorm";
import dotenv from "dotenv";

dotenv.config();

databaseConnection();
const app = express();

app.use(express.json());
app.use(routes);

export { app };
