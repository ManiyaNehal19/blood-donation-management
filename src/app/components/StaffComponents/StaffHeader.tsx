"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function DashboardCards() {
  const [totalAppointments, settotalappointment] = useState<number>(0);
  const [totalDonors, settotaDonors] = useState<number>(0);
  const [totalunits, settotalunits] = useState<number>(0);
  useEffect(()=>{
    async function getDate (){
      try{
        const res = await axios.get("/api/staffheader", {params:{}});
        settotalappointment(res.data.totalAppointments);
        settotalunits(res.data.totalUnitsAvailable);
        settotaDonors(res.data.totalDonors);
      }catch(error){
        console.log(error);
      }
    }
    getDate();
  }, [])

  const cards = [
    {
      title: "Total Units Available",
      value: totalunits,
      icon: "🩸",
      color: "text-blue-700",
      bgcolor:"bg-blue-200"
    },
    {
      title: "Today's Donations",
      value: totalAppointments,
      icon: "📈" ,
      color:"text-green-700",
      bgcolor:"bg-green-200"
    },
    {
      title: "Active Donors",
      value: totalDonors,
      icon:"👫" ,
      color:"text-purple-700",
      bgcolor:"bg-purple-200"
    },
  ];

  return (
    <div className="flex items-center col-span-5 justify-center p-4 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-5 w-1/4 ml-1 rounded-xl shadow-sm border  border-gray-100 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-md">{card.title}</p>
            <p className={`rounded-full p-2 ${card.bgcolor} text-2xl`}>{card.icon}</p>
            
          </div>

          <h2 className= {`text-3xl font-semibold ${card.color}`} >{card.value}</h2>
        </div>
      ))}
    </div>
  );
}
