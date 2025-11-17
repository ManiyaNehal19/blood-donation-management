// "use client"
// import { useParams } from 'next/navigation';
// import DashboardCards from "@/app/components/StaffComponents/StaffHeader"
// import BloodInventory from '@/app/components/StaffComponents/Inventory';
// import TodaysDonations from '@/app/components/StaffComponents/TodoDonation';
// import ScheduledAppointments from '@/app/components/StaffComponents/ScheduledDontion';
// export default function DashboardPage() {
//   const params = useParams();
//   const cnic = params.cnic?.toString();
//  return(
//    <div className="w-full flex justify-center items-center">
//   <div className="grid grid-cols-5 grid-rows-5 gap-4 bg-blue-50 p-4 ">
//     <DashboardCards/>
//     <BloodInventory/>
//     <TodaysDonations/>
//     <ScheduledAppointments/>
//   </div>
//   </div>
  
//  );
// }


"use client";
import { useParams } from 'next/navigation';
import DashboardCards from "@/app/components/StaffComponents/StaffHeader"
import BloodInventory from '@/app/components/StaffComponents/Inventory';
import TodaysDonations from '@/app/components/StaffComponents/TodoDonation';
import ScheduledAppointments from '@/app/components/StaffComponents/ScheduledDontion';

export default function DashboardPage() {
  const params = useParams();
  const cnic = params.cnic?.toString();
  return (
    
      <div className="grid grid-cols-5 grid-rows-5 gap-4 p-6 bg-blue-50">
        <DashboardCards />
        <BloodInventory />
        <TodaysDonations />
        <ScheduledAppointments />
      </div>
 
  );
}
