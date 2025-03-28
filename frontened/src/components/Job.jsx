import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {

const navigate=useNavigate();
const daysAgoHandler=(mongodbTime)=>{
  const createdAt=new Date(mongodbTime)
  const currentTime=new Date()
  const timeDifference=currentTime-createdAt;
  return Math.floor(timeDifference/(24*60*60*1000));
}

  return (
    <div className="rounded-md p-5 shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoHandler(job?.createdAt)==0? "Today" : `${daysAgoHandler(job?.createdAt)} days ago`} </p>
        <Button className="rounted-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <Badge variant="ghost" className="text-blue-700 font-bold">{job?.positions} Positions</Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">{job?.jobType}</Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">{job?.salary} LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={()=> navigate(`/description/${job?._id}`)} className="hover:bg-[#7209b7] hover:text-white">Details</Button>
          <Button className="hover:bg-[#7209b7] hover:text-white">Save For Later</Button>
        </div>
    </div>
  );
};

export default Job;
