import { Router } from "express";
import { TokenController } from "@modules/users/useCases/TokenController";
import { UserController } from "@modules/users/useCases/UserController";
import authenticate from "@shared/services/authenticate";

const userController = new UserController();
const tokenController = new TokenController();

const userRoutes = Router();

userRoutes.get("/", userController.welcome);

userRoutes.post("/signin", userController.signin);

userRoutes.post("/signup", userController.create);

userRoutes.get("/refresh", tokenController.generateRefreshToken);

// We can use "all" to set authentication in all requests in defined path
userRoutes.route("/users").all(authenticate).get(userController.index);

// This is another way to do it. Inside the params
userRoutes.get("/user/:id", authenticate, userController.findOneById);

export { userRoutes };
