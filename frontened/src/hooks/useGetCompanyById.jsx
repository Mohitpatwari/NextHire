import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT } from '@/utils/costatnt'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
  const dispatch=useDispatch()
   useEffect(()=>{
    const fetchSingleComapny=async ()=>{
      try{
        const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})
        if(res.data.success){
         dispatch(setSingleCompany(res.data.company));
        }
      } catch(err){
        console.log("Failed to load all jobs",err)
      }
    }
    fetchSingleComapny();
   },[companyId,dispatch])
}

export default useGetCompanyById