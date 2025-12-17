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
  const [time, settime] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post("/api/appointment", { cnic, date, time });
      setMessage({ text: "Appointment scheduled successfully!", isError: false });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage({ 
        text: "Failed to set appointment. Try again.", 
        isError: true 
      });
    } finally {
      setLoading(false);
    }
  };

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
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-0 border-none"
      style={{ width: "100vw", height: "100vh", maxWidth: "100vw", maxHeight: "100vh" }}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Schedule a Donation
        </h2>
        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm text-center ${message.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Date</label>
            <input
              required
              type="date"
              min={minDate}
              max={maxDate}
              onChange={(e) => setdate(e.target.value)}
              className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Available Slots</label>
            <select
              required
              value={time}
              onChange={(e) => settime(e.target.value)}
              className="border rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="" disabled>Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`text-white px-4 py-2 rounded-lg transition-colors ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
            >
              {loading ? "Processing..." : "Submit"}
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