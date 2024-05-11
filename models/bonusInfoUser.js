import mongoose from "mongoose";

const bonusInfoUserSchema = new mongoose.Schema({
    hooby: {
        type: String,
        default: [],
    },
    target: {
        type: String,
        default: [],
    },
});

const BonusInfoUserModel = mongoose.model("bonusInfoUser", bonusInfoUserSchema);

export default BonusInfoUserModel;
