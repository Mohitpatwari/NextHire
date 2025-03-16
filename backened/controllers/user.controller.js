import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill all the required details",
        success: false,
      });
    }

    let profilePhotoUrl = ""; // Store the profile image URL

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: "job_portal/profile_images",
        resource_type: "image", // Accepts only images
      });
      profilePhotoUrl = uploadResult.secure_url;
    }

    // const file=req.file;
    // const fileUri=getDataUri(file)
    // const cloudResponse=await cloudinary.uploader.upload(fileUri)

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

   const hashedPassword=await bcrypt.hash(password,10);

   await User.create({
      fullname,
      email,
      password:hashedPassword,
      role,
      phoneNumber,
      profile: {
        profilePhoto: profilePhotoUrl, // Store profile image URL
      },
   })

   return res.status(200).json({
    message:"Account created successfully",
    success:true
   })

  } catch (err) {
    console.log("Invalid Registration: ", err);
  }
};

export const login=async(req,res) => {
   try{
     
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return res.status(400).json({
            message:"Fill all the required details",
            success:false
        })
    }

    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password",
            success:false
        })
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid email or password",
            success:false
        })
    }

    if(role != user.role){
        return res.status(400).json({
            message:"Invalid access roles",
            success:false
        })
    }

    const tokenData={
        userId:user._id
    }
    const token=await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

    user={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }

    return res.status(200)
    .cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'})
    .json({message:`Welcome back ${user.fullname}`,success:true,user})

   } catch(err){
    console.log("Invalid login: ",err)
   }
}

export const logout=async(req,res) => {
    try{
      
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"User logout successfully",
        success:true
      })

    } catch(err){
        console.log("logout failed!",err)
    }
}

export const updateProfile=async (req,res) =>{
    try{
  
     const {fullname,email,phoneNumber,bio,skills}=req.body;
     const file=req.file;
     let cloudResponse=null;

     //Here Cloundary setup 
     let pdfUrl = "";
     let resumeOriginalName = "";
 
     // If a file is uploaded (resume)
     if (req.file) {
       const fileUri = getDataUri(req.file);
       const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
         folder: "job_portal/resumes",
         resource_type: "auto",
         access_mode: "public",
       });
 
       pdfUrl = uploadResult.secure_url;
       resumeOriginalName = req.file.originalname;
     }

     let skillsArray;
     if(skills) skillsArray=skills.split(",");
     const userId=req.id;
     let user=await User.findById(userId)

     if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false
        })
     }

     if(fullname) user.fullname=fullname;
     if(email) user.email=email;
     if(phoneNumber) user.phoneNumber=phoneNumber;
     if(skills) user.profile.skills=skillsArray;
     if(bio) user.profile.bio=bio
     if (pdfUrl) user.profile.resume = pdfUrl;
     if (resumeOriginalName) user.profile.resumeOriginalName = resumeOriginalName;

     //Some cloudinary code will append here
     await user.save();

     user={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).json({
        message:"Profile updated successfully",
        success:true,
        user
    })

    } catch(err){
        console.log("Profile updation failed!",err)
        res.status(500).json({
          message: "Internal server error",
          success: false,
        });
    }
}