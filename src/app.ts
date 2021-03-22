import express from "express";
import databaseConnection from "./database";

import { routes } from "./routes";

databaseConnection();
const app = express();

app.use(express.json());
app.use(routes);

export { app };
