"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Eligibilepop from "./Eligibilepop";
export default function ScheduledAppointments() {
  const [eligibility_pop, seteligibiltiy_pop] = useState(false);
  const [cnic, setcnic] = useState("");
  const [refreshBtn, setBntn]  = useState(0);
  type appointment = {

    firstName: string,
    lastName: string,
    appointmentTime: string,
    bloodType: string,
    cnic: string
  }
  const [getapp, setapp]  = useState<appointment[]>([])
  useEffect(()=>{
    async function getAppointment(){
      try {
        const getapp = await axios.get("/api/staffAppoint", {params:{}});
        setapp(getapp.data);
      } catch (error) {
        console.log(error)
      }
    }
    getAppointment();
  },[refreshBtn])
  
  return (
    <div className="p-6  bg-white rounded-lg row-span-4 col-start-5 row-start-2 max-w-md mx-auto">
      {eligibility_pop && <Eligibilepop cnic={cnic} onClose={()=>(
        seteligibiltiy_pop(false),
        setcnic("")
      )}/>}
      
      <h2 className="text-xl font-semibold mb-4">Today&apos;s Appointments</h2>
      <button 
        onClick={()=>(
          setBntn(prev=>prev+1))}
        // onClick={() => setBntn(prev => prev + 1)})
      className="text-center w-full text-blue-500  border border-blue-500 rounded-md hover:bg-blue-50"> Refresh Appointment</button>
      <div className="space-y-3">
        {getapp.map((item, idx) => (
          <div
            key={idx}
            onClick={()=>(
              seteligibiltiy_pop(true),
              setcnic(item.cnic)
            )}
            className="rounded-2xl p-4 shadow-sm flex bg-gray-50 justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.firstName +" "+ item.lastName}</p>
              <p className="text-sm text-gray-600">Blood Type: {item.bloodType}</p>
            </div>

            <span
              className={`text-sm font-medium "text-blue-600"}`}
            >
              {item.appointmentTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
