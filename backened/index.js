import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
import path from "path"

dotenv.config({})

let app=express();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

const PORT=process.env.PORT ||3000;

const __dirname=path.resolve();

//api calls here
app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)

app.use(express.static(path.join(__dirname, "/frontened/dist")))
app.get("*",(_,res)=>{
    res.sendFile(path.join(__dirname, "frontened", "dist", "index.html"))
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`);
})