import mongoose from "mongoose";
const workUserSchema = new mongoose.Schema({
    skill: {
        type: String,
        require: true,
    },
    project: {
        nameProject: String,
        content: String,
        role: String,
        timeStart: Date,
        timeEnd: Date,
    },
    companyWork: {
        nameCompany: String,
        address: String,
        timeStartWork: Date,
        timeEndWork: Date,
        role: String,
    },
});

const WorkUserModel = mongoose.model("workUser", workUserSchema);

export default WorkUserModel;
