"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface RequestPopupProps {
  hospId: string;
  onClose: () => void;
}

const bloodTypes = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

const RequestPopUp: React.FC<RequestPopupProps> = ({ hospId, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const payload = {
      hospId,
      requests: Object.fromEntries(
        Object.entries(quantities).map(([type, v]) => [type, Number(v || 0)])
      ),
    };

    try {
      const res = await axios.post("/api/requests", payload);
      setMessage("Request submitted successfully.");

      setTimeout(() => {
        dialogRef.current?.close();
        onClose();
      }, 600);

    } catch (error) {
      console.error(error);
      setMessage("Failed to submit request.");
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
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg transition-all max-h-[85vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Blood Request Form
        </h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded-lg text-sm ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {bloodTypes.map((type) => (
            <div key={type} className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">
                {type} (mL)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Enter amount in mL"
                value={quantities[type] || ""}
                onChange={(e) =>
                  setQuantities({ ...quantities, [type]: e.target.value })
                }
                className="border border-red-200 rounded-lg p-3 outline-none 
                           focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
          ))}

          <p className="text-xs text-gray-500 italic pt-2">
            Request for Hospital ID: <strong>{hospId}</strong>
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold shadow-md 
                         bg-red-600 hover:bg-red-700 text-white"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 
                         px-6 py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestPopUp;
