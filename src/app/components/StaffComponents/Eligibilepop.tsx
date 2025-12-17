"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface EligiblePopProps {
  cnic: string;
  onClose: () => void;
}

const Eligibilepop: React.FC<EligiblePopProps> = ({ cnic, onClose }) => {
  const dialogref = useRef<HTMLDialogElement>(null);

  const [hemoglobin, setHemoglobin] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dialogref.current?.showModal();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const dataToSend = {
        donorCnic: cnic,
        hemoglobin: parseFloat(hemoglobin),
        bloodPressure: parseFloat(bloodPressure),
        weight: parseFloat(weight),
        date: new Date().setUTCHours(0, 0, 0, 0),
      };

      const res = await axios.post("/api/eligibility", dataToSend);

    
      setMessage({ text: `${res.data.message}`, type: "success" });
      
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error: any) {
      console.error("Eligibility submission error:", error);
      // Error Path
      const errorMessage = error.response?.data?.error || "Failed to submit screening data. Please try again.";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dialogref.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogref}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-0 border-none w-screen h-screen max-w-none max-h-none"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transition-all transform scale-100 opacity-100">
        
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Eligibility Screening
        </h2>

        {message && (
          <div className={`p-4 mb-4 rounded-lg text-sm font-medium border-l-4 text-center animate-in fade-in zoom-in duration-300 ${
            message.type === "success" 
              ? "bg-green-100 text-green-800 border-green-500" 
              : "bg-red-100 text-red-800 border-red-500"
          }`}>
           
            {message.text}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
      
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

          {/* Blood Pressure Input */}
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

          {/* Weight Input */}
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

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || message?.type === "success"}
              className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                loading || message?.type === "success" 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {loading ? "Submitting..." : message?.type === "success" ? "Done" : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Eligibilepop;