import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/costatnt";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const shortListedStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.application);

  const statusHandler=async (status,id)=>{
    try{
       const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true
       })
       if(res?.data?.success){
        toast.success(res.data.message)
       }
    } catch(error){
        toast.error(error.response.data.message)
        console.log("Failed to update status",error)
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="text-blue-600"><a target="_blank" href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      {shortListedStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            onClick={()=>statusHandler(status,item._id)}
                            className="flex items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
