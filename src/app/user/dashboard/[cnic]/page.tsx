"use client";
import UserHeader from "@/app/components/DonorComponents/UserHeader";
import UserInfo from "@/app/components/DonorComponents/UserInfo";
import { useState } from "react";
import { useParams } from "next/navigation";
import AppointmentDialog from "@/app/components/DonorComponents/AppointmentDialog";
import UserAppoit from "@/app/components/DonorComponents/UserAppoit";
import UserAppointBtn from "@/app/components/DonorComponents/UserAppointBtn";
export default function DashboardPage() {
  const [appointment_diaglog, setappointment_dialog] = useState(false);
  const params = useParams();
  const cnic = params.cnic?.toString();

  return (
    <div className="w-full px-4 py-4 text-gray-800 bg-white flex flex-col items-center justify-center">
      {appointment_diaglog && (
        <AppointmentDialog cnic={cnic} onClose={() => setappointment_dialog(false)} />
      )}
      
      <UserHeader cnic={cnic}/>
      
      <div className="flex items-center justify-end w-8/10 mt-4">
       
        <UserAppointBtn onClick={() => setappointment_dialog(true)} cnic={cnic} />
      </div>
      <UserInfo cnic={cnic}/>
      <UserAppoit cnic={cnic}/>
    </div>
  );
}