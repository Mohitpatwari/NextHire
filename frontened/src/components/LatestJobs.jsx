import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest </span>Career Opportunities
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {Array.isArray(allJobs) && allJobs.length === 0 ? (
          <span>No jobs available</span>
        ) : (
          Array.isArray(allJobs) &&
          allJobs.slice(0, 6).map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.1 }} // Scale up on hover for each job card
              transition={{ type: "spring", stiffness: 150, mass:2 }} // Spring transition for each card
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
