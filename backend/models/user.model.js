import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum : ['student' , 'recruiter'],
        required: true
    },
    profile:{
        type: String,
        bio:{type: String},
        skills: [{type: String}],
        resume: {type: String}, //url to resume file
        resumeOrginalName: {type: String}, //original name of the resume file
        company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"} ,
        profilePhoto: {type: String, default : " "}
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
