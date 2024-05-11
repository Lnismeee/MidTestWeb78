import mongoose from "mongoose";

const infoUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    placeBirth: {
        type: String,
        require: true,
    },
    nationality: {
        type: String,
        require: true,
    },
    education: {
        type: String,
        require: true,
    },
});

const InfoUserModel = mongoose.model("infoUser", infoUserSchema);

export default InfoUserModel;
