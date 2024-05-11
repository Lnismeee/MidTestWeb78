import UserModel from "../models/users.js";
import bcrypt from "bcrypt";
const userController = {
    createUser: async (req, res) => {
        try {
            const { email, passWord, confirmPassWord } = req.body;
            if (!email)
                throw {
                    message: "Vui lòng nhập tài khoản Email!!",
                    status: 403,
                };
            if (!passWord)
                throw {
                    message: "Vui lòng nhập  mật khẩu!!",
                    status: 403,
                };
            if (passWord !== confirmPassWord) {
                return res.status(400).json({
                    message: "Vui lòng nhập xác nhận lại mật khẩu!!",
                });
            }
            // kiểm tra tồn tại email
            const existedEmail = await UserModel.findOne({ email });
            if (existedEmail) throw new Error("Email đã tồn tại!!");
            const data = req.body;
            // tạo chuỗi ngẫu nhiên
            const salt = bcrypt.genSaltSync();
            // thực hiện mã hoá với chuỗi salt
            const hash = bcrypt.hashSync(data.passWord, salt);
            const createdUser = await UserModel.create({
                ...data,
                passWord: hash,
                salt: salt,
            });
            res.status(201).send({
                data: createdUser,
                message: "Tạo tài khoản thành công",
            });
        } catch (error) {
            res.status(403).send({
                message: error.message,
            });
        }
    },
    login: async (req, res) => {
        try {
            const data = req.body;
            const crrUser = await UserModel.findOne({
                email: data.email,
            });
            // so sánh mật khẩu
            if (!crrUser) {
                throw new Error("Sai tài khoản hoặc mật khẩu!");
            }
            if (
                bcrypt.hashSync(data.passWord, crrUser.salt) !==
                crrUser.passWord
            ) {
                throw new Error("Sai tài khoản hoặc mật khẩu!");
            }
            res.status(200).send({
                data: crrUser,
                message: "Đăng nhập thành công",
            });
        } catch (error) {
            res.status(401).send({
                message: error.message,
            });
        }
    },
    logout: async (req, res) => {
        res.status(200).json({
            message: "Đăng xuất thành công",
        });
    },
    getUser: async (req, res) => {
        try {
            const allUser = await UserModel.find({});
            res.status(200).send({
                data: allUser,
                message: "Successful",
                success: true,
            });
        } catch (error) {
            res.status(error.status ?? 403).send({
                data: null,
                message: error.message,
                success: false,
            });
        }
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const { role, userId } = req;
            const crrUserInfo = await UserModel.findById(id);
            if (!crrUserInfo)
                throw {
                    message: "Không tồn tại người dùng!",
                };
            if (role === "USER") {
                if (crrUserInfo._id.toString() !== userId) {
                    res.status(403).send({
                        data: null,
                        message: "Bạn không có quyền thực hiện hành động này!",
                        success: false,
                    });
                }
            }
            res.status(200).send({
                data: crrUserInfo,
                message: "Successful",
                success: true,
            });
        } catch (error) {
            res.status(error.status ?? 403).send({
                data: null,
                message: error.message,
                success: false,
            });
        }
    },
};
export default userController;
