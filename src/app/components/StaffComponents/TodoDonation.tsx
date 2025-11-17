"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import InventoryPop from "./InventoryPop";
export default function TodaysDonations() {
  type donation = {
    firstName: string,
    lastName: string,
    bloodType: string,
    cnic:string
  }
  const [updateinventory, setupdateinventory] = useState(0);
  const [donations, setdonations] = useState<donation[]>([])
  const [pop_up, setpop_up] = useState(false);
  const [cnic, setcnic] = useState("");

  useEffect(()=>{
    async function getEligible(){

      try {
        const res = await axios.get("/api/geteligible");
        setdonations(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEligible();
  }, [updateinventory])
  
  return (
    <div className="w-full p-6 bg-white col-span-4 row-span-2 col-start-1 overflow-scroll row-start-4 rounded-xl shadow-sm border border-gray-200">
     { pop_up && <InventoryPop cnic={cnic} onClose={()=>(
        setcnic(""),
        setpop_up(false)
      )}/>}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today&apos;s Donations</h2>

        <button className="text-blue-600 border border-blue-400 px-4 py-1 rounded-md hover:bg-blue-50 text-sm"
        onClick={()=>(
          setupdateinventory(prev => prev+1)
        )}>
          Refresh Donations
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="pb-2">Donor</th>
            <th className="pb-2">Blood Type</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Action</th>

           
          </tr>
        </thead>

        <tbody>
          {donations.map((item, index) => (
            <tr key={index} className="border-b last:border-0 text-sm">
              
              <td className="py-3">{item.firstName + " " + item.lastName}</td>

              <td>
                <span className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded-md text-xs font-medium">
                  {item.bloodType}
                </span>
              </td>
              <td>
                <span
                  className="px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-600 border-green-300"
                >
                  Eligible
                </span>
              </td>
              <td>
                <button className="text-blue-600 hover:underline text-sm"
                onClick={()=>(
                  setcnic(item.cnic),
                  setpop_up(true)
                )}>
                  Update Inventory
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
