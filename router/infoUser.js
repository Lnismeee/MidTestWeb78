import { Router } from "express";
import infoUserController from "../controllers/infoUser.js";
import { authMiddleware } from "../middlewares/role.js";

const InfoUserRouter = Router();

const middlewareUpdateInfo = (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            throw {
                message: "Chưa cung cấp id bài post!",
                status: 403,
            };
        const { fullName } = req.body;
        if (!fullName)
            throw {
                message: "Chưa cung cấp fullName!",
                status: 403,
            };
        next();
    } catch (error) {
        res.status(error.status ?? 403).send({
            data: null,
            message: error.message,
            success: false,
        });
    }
};

InfoUserRouter.post("", infoUserController.createInfo);
InfoUserRouter.put("/:id", middlewareUpdateInfo, infoUserController.updateInfo);

export default InfoUserRouter;
