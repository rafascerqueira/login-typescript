import { Router } from "express";
import { userRoutes } from "./users.routes";

const routes = Router();

routes.use("/user", userRoutes);

export { routes };
