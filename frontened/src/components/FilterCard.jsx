import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Hyderabad", "Bangalore", "Delhi", "Dumka", "Haryana"],
  },
  {
    filterType: "Industry",
    array: ["Frontened", "Backened", "Fullstack", "Data Science", "AI/ML"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "50k-1lakh", "1lakh-5lakh", ">5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue,setSelectedValue]=useState('')
  const dispatch=useDispatch()
  const changeHandler=(value)=>{
    setSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])
  return (
    <div className="w-full rounded-md bg-white p-3">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3"/>
   
        <RadioGroup value={selectedValue} onValueChange={changeHandler} >
         {
          filterData.map((data,index)=>(
            <div>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {
                data.array.map((item,ind)=>{
                  const itemId=`id${index}-${ind}`
                  return (
                    <div className="flex items-center space-x-2 my-2 text-gray-800">
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
         }
        </RadioGroup>
    </div>
  );
};

export default FilterCard;
