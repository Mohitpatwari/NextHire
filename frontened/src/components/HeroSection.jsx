"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

const [query,setQuery]=useState("")
const dispatch=useDispatch()
const navigate=useNavigate()
const searchJobHandler=()=>{
     dispatch(setSearchedQuery(query))
     navigate("/browse")
}

  return (
    <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 italic rounded-full bg-gray-100 text-[#F83002] font-medium">
        Trusted by thousands of job seekers and recruiters.
      </span>
      <h1 className="text-5xl font-bold leading-tight">Find. Apply. <br />Hired - <span className="text-[#6A38C2]">NextHire! </span></h1>
      <p>Your career starts here with the best opportunities!</p>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto items-center gap-4">
        <input
        type="text"
        placeholder="Find your dream jobs"
        onChange={(e)=>setQuery(e.target.value)}
        className="outline-none border-none w-full"
        />
       <Button onClick={searchJobHandler} className="rounded-r-full leading-tight bg-[#6A38C2] hover:bg-[#5A2FA8]">
            <Search className="h-5 w-5"/>
        </Button>
      </div>
        </div>
    </div>
  );
};

export default HeroSection;
