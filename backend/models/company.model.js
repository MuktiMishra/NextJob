import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    
    logo: {
        type: String,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true
        }
    ]
})