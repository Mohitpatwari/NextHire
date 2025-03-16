import { Job } from "../models/job.model.js";


export const jobPost=async (req,res) => {
    try{
      
      const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;

      if(!title || !description || !requirements || !salary || !location || !jobType ||
         !experience || !position || !companyId
      ){
        return res.status(400).json({
            message:"Fill all the require details",
            status:false
        })
      }

      const userId=req.id;

      const job=await Job.create({
        title,
        description,
        requirements,
        salary:Number(salary),
        location,
        jobType,
        position,
        experienceLevel:experience,
        company:companyId,
        created_by:userId
      })

      return res.status(201).json({
        message:"Job created successfully",
        success:true,
        job
      })

    } catch(err){
        console.log("Posting a job Failed!",err)
    }
}

export const getAllJobs=async (req,res) => {
    try{
   
    const keyword=req.query.keyword || " ";
    const query={
        $or:[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}}
        ]
    };
    const jobs=await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1});
    if(!jobs){
        return res.status(404).json({
            message:"Jobs not found",
            success:false
        })
    }
    return res.status(200).json({
        message:"Jobs found",
        success:true,
        jobs
    })

    } catch(err){
        console.log("Failed to load all jobs",err);
    }
}

export const getJobById=async (req,res) => {
    try{
       
      const jobId=req.params.id;
      const job=await Job.findById(jobId).populate({
        path:"applications"
      });
      if(!job){
        return res.status(404).json({
            message:"Job not exist",
            success:false
        })
      }

      return res.status(200).json({
        job,
        success:true
      })

    } catch(err){
        console.log("Job not found by id",err);
    }
}

export const getAdminJobs=async (req,res) =>{
    try{
 
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1
        });

        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found by adminId",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch(err){
        console.log("Failed to load admin jobs",err)
    }
}