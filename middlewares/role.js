import UserModel from "../models/users.js";

const authMiddleware = {
    authentication: async (req, res, next) => {
        try {
            const data = req.body;
            const findCrrUser = await UserModel.findOne({ email: data.email });
            if (!findCrrUser)
                throw {
                    message: "Bạn chưa xác thực!",
                };
            req.role = findCrrUser.role;
            req.userId = findCrrUser._id.toString();
            next();
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
                success: false,
            });
        }
    },
    authorizationAdmin: (req, res, next) => {
        try {
            const { role } = req;
            if (role !== "ADMIN")
                throw {
                    message: "Bạn không thể truy cập!",
                    status: 404,
                };
            next();
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null,
                success: false,
            });
        }
    },
};
export { authMiddleware };
