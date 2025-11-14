// import React from "react";

// const Page = ({ params }: { params: { id: string } }) => {

//   const userHeader = [
//     {
//       name: "Total Donations",
//       attribute: 0,
//       emoji: "🩸",
//       color: "#ef4444", // red-500
//     },
//     {
//       name: "Eligibility Status",
//       attribute: "Eligible",
//       emoji: "✅",
//       color: "#22c55e", // green-500
//     },
//     {
//       name: "Blood Type",
//       attribute: "B+",
//       emoji: "🔴",
//       color: "#3b82f6", // blue-500
//     },
//     {
//       name: "Next Eligible",
//       attribute: "Ready Now",
//       emoji: "📅",
//       color: "#a855f7", // purple-500
//     },
//   ];

//   return (
//     <div >
//       <div></div>
//       
//     </div>
//   );
// };

// export default Page;
"use client";

import UserHeader from "@/app/components/UserHeader";
import UserInfo from "@/app/components/UserInfo";
import { useState } from "react";
import { useParams } from "next/navigation";
import AppointmentDialog from "@/app/components/AppointmentDialog";


export default function DashboardPage() {
  const [appointment_diaglog, setappointment_dialog] = useState(false);
  const params = useParams();
  const cnic = params.cnic?.toString();

  return (
    <div className="w-full px-4 py-4 text-gray-800 bg-white flex flex-col items-center justify-center">
      {appointment_diaglog && <AppointmentDialog cnic={cnic} onClose={()=>setappointment_dialog(false)}/> }
      <UserHeader cnic={cnic}/>
      <div className="flex items-center justify-end w-8/10 mt-4">
        <button 
        onClick={()=>setappointment_dialog(true)} 
        className="bg-red-600  hover:bg-red-700 cursor-pointer text-white p-3 rounded-lg">Schedule Donation </button>
      </div>
      <UserInfo cnic={cnic}/>
     
    </div>
  );
}

