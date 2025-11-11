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
import UserHistory from "@/app/components/UserHistory";
import UserInfo from "@/app/components/UserInfo";
import { useParams } from "next/navigation";


export default function DashboardPage() {
  const params = useParams();
  const cnic = params.cnic;

  return (
    <div className="w-full px-4 py-4 text-gray-800 flex flex-col items-center justify-center">
      <UserHeader cnic={cnic}/>
      <UserInfo cnic={cnic}/>
      <UserHistory cnic={cnic}/>
    </div>
  );
}

