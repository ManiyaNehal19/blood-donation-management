"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const AppointmentDialog = ({
  cnic,
  onClose,
}: {
  cnic: string;
  onClose: () => void;
}) => {

  const dialogref = useRef<HTMLDialogElement>(null);

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [date, setdate] = useState("");
  const [time,settime] = useState("");
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post("/api/appointment", {cnic, date, time });
      onClose();
      console.log(res.data.message);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dialogref.current?.showModal();
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    setMinDate(today.toISOString().split("T")[0]);
    setMaxDate(nextMonth.toISOString().split("T")[0]);
  }, []);

  return (
    <dialog
      ref={dialogref}
      className="
        fixed inset-0 bg-black/40 backdrop-blur-sm 
        flex items-center justify-center p-0 border-none
      "
       style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
      
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
        
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Schedule a Donation
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit} >
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Date</label>
            <input
              type="date"
              min={minDate}
              max={maxDate}
              onChange={(e)=>setdate(e.target.value)}
              className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

    
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Time (9AM - 5PM)</label>
            <input
              type="time"
              min="09:00"
              max="17:00"
              step="3600"
              onChange={(e) => settime(e.target.value)}
              className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                 
              >

              Submit
            </button>

            <button
              type="button"
              onClick={() => {
                dialogref.current?.close();
                onClose();
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AppointmentDialog;
