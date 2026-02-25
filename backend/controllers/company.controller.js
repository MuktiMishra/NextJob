import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js"; 
import cloudinary from "../utils/cloudinary.js"; 

export const registerCompany = async(req, res)=>{
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company  = await Company.findOne({companyName});
        if(company){
            return res.status(400).json({
                message: "Company already exists with this name",
                success: false
            });
        }
        company = await Company.create({
            name: companyName , 
            userId: req.id
        });
        return res.status(201).json({
            message: "Company created successfully",
            success: true,
            company
        });
    }
        
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// to get all company details of logged in user
export const getCompany = async(req, res)=>{
    try{
        const userId = req.id; // logged in userID
        const companies = await Company.find({userId});
        if(!companies || companies.length === 0){
            return res.status(400).json({
                message: "Company not found for this user",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company details fetched successfully",
            success: true,
            companies
        });
    }   
    
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// to get company details by company id
export const getCompanyById = async(req, res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message: "Company not found with this id",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company details fetched successfully",
            success: true,
            company
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// to update company details by company id
export const updateCompany = async(req, res)=>{
    try{
        const {name, description, website, location} = req.body;
        const file = req.file;
        const companyId = req.params.id;
        
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        const updateData = {name , description, website, location, logo};
      
        const company = await Company.findByIdAndUpdate(companyId, updateData, {new: true});
        if(!company){
            return res.status(400).json({
                message: "Company not found with this id",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company information updated successfully",
            success: true,
            company
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",   
            success: false
        });
    }
}
