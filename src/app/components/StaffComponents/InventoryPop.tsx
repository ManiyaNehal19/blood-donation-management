"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface InventoryPopProps {
  cnic: string;     
  onClose: () => void;
}

const InventoryPop: React.FC<InventoryPopProps> = ({ cnic, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [volume, setVolume] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!volume || !type || !date) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const inventoryData = {
        cnic,
        volume: parseInt(volume),
        type,
        date: new Date(date).setUTCHours(0, 0, 0, 0),
      };
      
      const invRes = await axios.post("/api/inventory", inventoryData);
      const historyData = {
        cnic,
        bloodVolume: parseInt(volume),
        historyDate: new Date().setUTCHours(0, 0, 0, 0),
      };

      await axios.post("/api/donorHistory", historyData);

      setMessage(invRes.data.message || "Inventory added successfully.");

      setTimeout(() => {
        dialogRef.current?.close();
        onClose();
      }, 600);
    } catch (error) {
      console.error("Inventory submission error:", error);
      setMessage("Failed to add inventory.");
    }
  };

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                 flex items-center justify-center p-0 border-none 
                 w-screen h-screen max-w-none max-h-none"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transition-all">
        
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Add Blood Inventory
        </h2>

        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm 
            ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">
              Volume (mL)
            </label>
            <input
              type="number"
              placeholder="e.g., 500"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="border border-red-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">
              Blood Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-red-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">
              Collection Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-red-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <p className="text-xs text-gray-500 italic pt-2">
            Donor CNIC for History Update: <strong>{cnic}</strong>
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold shadow-md bg-red-600 hover:bg-red-700 text-white"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default InventoryPop;
