import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/costatnt";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {loading,user}=useSelector(store=>store.auth)

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler=async(e)=>{
    e.preventDefault()

    try{
       dispatch(setLoading(true))
        const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        if(res.data.success){
         dispatch(setUser(res.data.user))
         navigate("/")
         toast.success(res.data.message)
        }
    } catch(err){
      console.log("Failed to login",err)
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
    finally{
      dispatch(setLoading(false))
    }
  }

useEffect(()=>{
  if(user){
    navigate("/")
  }
})

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Log In</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              className="text-gray-500"
              type="email"
              name="email"
              onChange={changeEventHandler}
              value={input.email}
              placeholder="Enter your Email"
              style={{ border: "1px solid lightgray" }}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              className="text-gray-500"
              type="password"
              name="password"
              onChange={changeEventHandler}
              value={input.password}
              placeholder="Enter your password"
              style={{ border: "1px solid lightgray" }}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center my-5 gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading? <Button className="w-full my-4 bg-blue-950 text-white hover:bg-blue-950"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> :
            <Button className="w-full my-4 bg-blue-950 text-white hover:bg-blue-900" type="submit">
            LogIn
          </Button>
          }
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
