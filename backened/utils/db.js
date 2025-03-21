import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Database connected successfully");
    } catch(err){
        console.log("Database connection failed: ",err);
    }
}

export default connectDB;