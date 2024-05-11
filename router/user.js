import { Router } from "express";
import userController from "../controllers/user.js";
import { authMiddleware } from "../middlewares/role.js";
const UserRouter = Router();
UserRouter.post("/users", userController.createUser);
UserRouter.post("/login", userController.login);
UserRouter.post("/logout", userController.logout);

UserRouter.get(
    "/users",
    authMiddleware.authentication,
    authMiddleware.authorizationAdmin,
    userController.getUser
);
UserRouter.get(
    "/users/:id",
    authMiddleware.authentication,
    userController.getUserById
);

export default UserRouter;
