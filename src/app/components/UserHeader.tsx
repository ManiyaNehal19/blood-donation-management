"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const UserHeader = ({ cnic }: { cnic: string }) => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [Status, setStatus] = useState("");
  const [totalDon, settotalDon] = useState();
  const [nextStat, setnextStat] = useState();


  useEffect(() => {
    const fetchBloodGroup = async () => {
      const res = await axios.post("/api/userHeader", { cnic });
      setBloodGroup(res.data.bloodGroup );
      settotalDon(res.data.totalDonations);
      setStatus(res.data.eligibilityStatus);
      setnextStat(res.data.nextEligibleDate);

    };
    fetchBloodGroup();
  }, [cnic]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      

      <div className="flex items-center rounded-xl p-5 shadow-md bg-white border-l-4 border-red-500 hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-2">🩸</div>
        <div>
          <h4 className="text-lg font-semibold">Total Donations</h4>
          <p className="text-sm mt-1 font-medium opacity-80">
            {totalDon || "Loading..."}
            
          </p>
        </div>
      </div>

      <div className="flex items-center rounded-xl p-5 shadow-md bg-white border-l-4 border-green-500 hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-2">✅</div>
        <div>
          <h4 className="text-lg font-semibold">Eligibility Status</h4>
          <p className="text-sm mt-1 font-medium opacity-80">
            {Status|| "Loading..."}
          </p>
        </div>
      </div>

      <div className="flex items-center rounded-xl p-5 shadow-md bg-white border-l-4  border-blue-500 hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-2">🅰️</div>
        <div>
          <h4 className="text-lg font-semibold">Blood Group</h4>
          <p className="text-sm mt-1 font-medium opacity-80">
            {bloodGroup || "Loading..."}
          </p>
        </div>
      </div>


      <div className="flex items-center rounded-xl p-5 shadow-md bg-white border-l-4 border-purple-500 hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-2">📅</div>
        <div>
          <h4 className="text-lg font-semibold">Next Eligibility</h4>
          <p className="text-sm mt-1 font-medium opacity-80">
            {nextStat|| "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
