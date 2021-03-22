import { Router } from "express";
import { UserController } from "./controllers/userController";
import authenticate from "./services/authenticate";

const userController = new UserController();

const routes = Router();

routes.get("/", userController.welcome);

routes.post("/signin", userController.signin);

routes.post("/signup", userController.create);

// We can use "all" to set authentication in all requests in defined path
routes.route("/users").all(authenticate).get(userController.index);

// This is another way to do it. Inside the params
routes.get("/user/:id", authenticate, userController.findOneById);

export { routes };
