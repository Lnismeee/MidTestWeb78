import { Router } from "express";
import UserRouter from "./user.js";
import InfoUserRouter from "./infoUser.js";

const rootRouterV1 = Router();

rootRouterV1.use("", UserRouter);
rootRouterV1.use("/infoUser", InfoUserRouter);

export default rootRouterV1;
