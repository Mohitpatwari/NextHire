import {Company} from "../models/company.model.js"
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany=async (req,res) => {
    try{
        
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({
                message:"company name is required",
                success:false
            })
        }

        let company=await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"You cannot register to same company",
                success:false
            })
        }

        company=await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(201).json({
            message:"New company created successfully",
            success:true,
            company
        })

    } catch(err){
        console.log("Company registration Failed!",err)
    }
}

export const getCompany=async (req,res) => {
    try{
    
      const userId=req.id;
      const companies=await Company.find({userId});

      if(!companies){
        return res.status(404).json({
            message:"Companies not found",
            success:false
        })
      }

      return res.status(200).json({
        companies,
        success:true
      })

    } catch(err){
        console.log("Access Companies Failed!",err);
    }
}

export const getCompanyById=async (req,res) => {
    try{
       const companyId=req.params.id;
       const company=await Company.findById(companyId)
       if(!company){
          return res.status(404).json({
            message:"Company not found",
            success:false
          })
       }

       return res.status(200).json({
          company,
          success:true
       })

    } catch(err){
        console.log("Failed to load company by id",err)
    }
}

export const updateCompany=async (req,res) => {
    try{
  
      const {name,description,website,location}=req.body;
      const file=req.file;
      let logoUrl=""
    
      if(file){
        const fileUri=getDataUri(file)
        const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
            folder: 'job_portal/logos',
            resource_type: 'auto', // It's an image file
          });
           logoUrl = uploadResult.secure_url;
      }

      //Cloudinary handle this

    //   const fileUri=getDataUri(file)
    //   const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
    //   const logo=cloudResponse.secure_url

      const updateData={name,description,website,location,logo:logoUrl}

      const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
      if(!company){
        return res.status(404).json({
            message:"Company not found",
            success:false
        })
      }

      return res.status(200).json({
        message:"Company details updated successfully",
        success:true,
        company
      })

    } catch(err){
        console.log("Failed to update Company details",err);
    }
}