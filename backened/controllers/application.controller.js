import { populate } from "dotenv";
import {Application} from "../models/Application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job id is required",
        success: false,
      });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "already applied for job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job do not exist",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (err) {
    console.log("Failed to apply for job", err);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}}
        }
      });

      if(!application){
        return res.status(404).json({
            message:"No applicatipns",
            success:false
        })
      }

      return res.status(200).json({
        message:"application found",
        success:true,
        application
      })
  } catch (err) {
    console.log("Failed to load applied Jobs", err);
  }
};

export const getApplicants=async (req,res) => {
    try{

      const jobId=req.params.id;
      const job=await Job.findById(jobId).populate({
        path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
          path:"applicant",
          options:{sort:{createdAt:-1}}
        }
      });

      if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
      }

      return res.status(200).json({
        job,
        success:true
      })

    } catch(err){
        console.log("Failed to load applicants",err)
    }
}

export const updateStatus=async (req,res)=>{
    try{

      const {status}=req.body;
      const applicationId=req.params.id;
      if(!status){
        return res.status(400).json({
            message:"Status is required",
            success:false
        })
      }

      const application=await Application.findOne({_id:applicationId})
      if(!application){
        return res.status(404).json({
            message:"application not found",
            status:false
        })
      }

      application.status=status.toLowerCase();
      await application.save();

      return res.status(200).json({
        message:"status updated",
        success:true,
      })

    } catch(err){
        console.log("Failed to update status",err)
    }
}