import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    passWord: {
        type: String,
        require: true,
    },
    confirmPassWord: {
        type: String,
        require: true,
    },
    userId: String,
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    salt: String,
});

const LoginUserModel = mongoose.model("users", userSchema);

export default LoginUserModel;
