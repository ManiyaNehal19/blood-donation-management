"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Define the component props
interface EligiblePopProps {
  cnic: string;
  onClose: () => void;
}

const Eligibilepop: React.FC<EligiblePopProps> = ({ cnic, onClose }) => {
  const dialogref = useRef<HTMLDialogElement>(null);

  // State for health metrics
  const [hemoglobin, setHemoglobin] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    dialogref.current?.showModal();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!hemoglobin || !bloodPressure || !weight) {
      setMessage("Please fill in all health metrics.");
      
      return;
    }

    try {
      const dataToSend = {
        donorCnic: cnic,
        hemoglobin: parseFloat(hemoglobin),
        bloodPressure: parseFloat(bloodPressure),
        weight: parseFloat(weight),
        date: new Date().setUTCHours(0, 0, 0, 0),

      };
      const res = await axios.post("/api/eligibility", dataToSend);

      setMessage(res.data.message || "Eligibility data submitted successfully.");
      
        dialogref.current?.close();
        onClose();
      

    } catch (error: any) {
      console.error("Eligibility submission error:", error);
      setMessage(error.response?.data?.error || "Failed to submit screening data.");
      
    }
  };

  const handleClose = () => {
    dialogref.current?.close();
    onClose();
  }

  return (
    <dialog
      ref={dialogref}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                 flex items-center justify-center p-0 border-none 
                 w-screen h-screen max-w-none max-h-none"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transition-all transform scale-100 opacity-100">
        
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Eligibility Screening
        </h2>

        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm ${message.includes("success") ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1 flex justify-between items-center">
              Hemoglobin (g/dL) 
              <span className="text-xs font-normal text-gray-400">Target: 12.5 - 18.0</span>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g., 14.5"
              value={hemoglobin}
              onChange={(e) => setHemoglobin(e.target.value)}
              className="border border-red-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1 flex justify-between items-center">
              Blood Pressure (Systolic) (mmHg) 
              <span className="text-xs font-normal text-gray-400">Target: 100 - 180</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 120"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              className="border border-red-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1 flex justify-between items-center">
              Weight (kg) 
              <span className="text-xs font-normal text-gray-400">Target: {'>'} 50 kg</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 75"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-red-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
              required
            />
          </div>

          <p className="text-xs text-gray-500 italic pt-2">
            Screening for Donor CNIC: **{cnic}**
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 bg-red-600 hover:bg-red-700 text-white"
            >
                Submit
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition duration-150"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Eligibilepop;