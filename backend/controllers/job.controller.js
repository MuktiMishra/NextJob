import Job from "../models/job.model.js";

// for company to post a job
export const postJob = async(req,res)=>{
    
    const {title, description, requirements , salary , location , jobtType , experience , postition , companyId} = req.body;
    const userId = req.id; // logged in user id
    try{
        if(!title || !description || !requirements || !salary || !location || !jobtType || !experience || !postition || !companyId){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements : requirements.split(","), // convert comma separated string to array
            salary : Number(salary), // convert salary to number
            location,
            jobtType,
            experience,
            postition,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
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

// for students to get all jobs with search and filter options
export const getAllJobs = async(req, res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title : {$regex : keyword , $options:"i"}},
                {description : {$regex : keyword , $options:"i"}}

            ]
        }
        const jobs = await Job.find(query);
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs
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

// for students to get job details by job id
export const = getJobById = async(req, res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message: "Job not found with this id",
                success: false
            });
        }
        return res.status(200).json({
            message: "Job details fetched successfully",
            success: true,  
            job
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

export const getAdminJobs = async(req, res)=>{
    try{
        const adminId = req.id; // logged in user id
        const jobs = await Job.find({created_by: adminId});
        if(!jobs || jobs.length === 0){
            return res.status(400).json({
                message: "No jobs found for this admin",
                success: false
            });
        }
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs
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

