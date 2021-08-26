import { Router } from "express";
import { TokenController } from "./controllers/TokenController";
import { UserController } from "./controllers/UserController";
import authenticate from "./services/authenticate";

const userController = new UserController();
const tokenController = new TokenController();

const routes = Router();

routes.get("/", userController.welcome);

routes.post("/signin", userController.signin);

routes.post("/signup", userController.create);

routes.get("/refresh", tokenController.generateRefreshToken);

// We can use "all" to set authentication in all requests in defined path
routes.route("/users").all(authenticate).get(userController.index);

// This is another way to do it. Inside the params
routes.get("/user/:id", authenticate, userController.findOneById);

export { routes };
