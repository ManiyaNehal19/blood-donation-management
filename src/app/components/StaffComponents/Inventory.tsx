"use client";

import axios from "axios";
import { log } from "console";
import { useEffect, useState } from "react";

export default function BloodInventory() {
  const [refresh, setrefresh] = useState(false);
    type inventory ={
        "A+": number,
        "B+": number,
        "A-":number,
        "B-": number,
        "AB+": number,
        "AB-": number,
        "O+": number,
        "O-": number,
    }
    const [bloodinvetory, setinventory] = useState<inventory>({
        "A+": 0,
        "B+": 0,
        "A-": 0,
        "B-": 0,
        "AB+": 0,
        "AB-": 0,
        "O+": 0,
        "O-": 0,
    });
    useEffect(()=>{
        async function getInventory() {
            try {
                const res = await axios.get("/api/inventory", {params:{}});
            setinventory(res.data);
            } catch (error) {
                console.log(error);
                
            }
            
        }
        getInventory();
        setrefresh(false);
    },[refresh])
  const data = [
  { type: "A+", units: bloodinvetory["A+"], color: "green" },
  { type: "A-", units: bloodinvetory["A-"], color: "yellow" },
  { type: "B+", units: bloodinvetory["B+"], color: "green" },
  { type: "B-", units: bloodinvetory["B-"], color: "yellow" },
  { type: "AB+", units: bloodinvetory["AB+"], color: "yellow" },
  { type: "AB-", units: bloodinvetory["AB-"], color: "red" },
  { type: "O+", units: bloodinvetory["O+"], color: "green" },
  { type: "O-", units: bloodinvetory["O-"], color: "red" },
];

  return (
    <div className="w-full p-6 bg-white rounded-xl col-span-4 row-span-2 row-start-2 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Blood Inventory by Type</h2>
        <button 
        onClick={()=>setrefresh(true)}
        className="text-blue-500 hover:underline text-sm">
          Refresh Data
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-red-100 rounded-xl bg-red-50 text-center">
            <h3 className="text-2xl font-bold text-red-600">{item.type}</h3>
            <p className="text-gray-500 text-sm mt-1">Units Available</p>
            <p className="text-3xl font-semibold mt-2">{item.units}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
