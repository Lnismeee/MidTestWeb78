import UserModel from "../models/users.js";
import InfoUserModel from "../models/infoUser.js";

const infoUserController = {
    createInfo: async (req, res) => {
        try {
            const {
                fullName,
                date,
                placeBirth,
                nationality,
                education,
                userId,
            } = req.body;
            if (!fullName)
                throw {
                    message: "Yêu cầu nhập fullName",
                    status: 403,
                };
            if (!userId)
                throw {
                    message: "Yêu cầu nhập userId",
                    status: 403,
                };
            // kiểm tra tồn tại user
            const crrUser = await UserModel.findById(userId);
            if (!crrUser)
                throw {
                    message: "Không tồn tại user!",
                };
            const createdInfo = await InfoUserModel.create({
                fullName,
                date,
                placeBirth,
                nationality,
                education,
            });

            res.status(201).send({
                data: createdInfo,
                message: "Tạo bài viết thành công!",
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
    updateInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const { role, userId } = req;
            const { fullName, date, placeBirth, nationality, education } =
                req.body;
            const crrPost = await InfoUserModel.findById(id);
            if (!crrPost)
                throw {
                    message: "không thấy bài post nào",
                    status: 403,
                };
            if (role === "USER" && userId !== crrPost.userId.String()) {
                throw {
                    message: "Bạn không thể thực hiện hành động!",
                    status: 403,
                };
            }
            if (fullName) crrPost.fullName = fullName;
            if (date) crrPost.date = date;
            if (placeBirth) crrPost.placeBirth = placeBirth;
            if (nationality) crrPost.nationality = nationality;
            if (education) crrPost.education = education;

            await crrPost.save();
            res.status(201).send({
                data: crrPost,
                message: "Cập nhật thông tin người dùng thành công!",
                success: true,
            });
        } catch (error) {
            res.status(error.status ?? 403).send({
                data: null,
                message: error.message ?? "Đã có lỗi xảy ra!",
                success: false,
            });
        }
    },
};
export default infoUserController;
