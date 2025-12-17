"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface UserAppointBtnProps {
  onClick: () => void;
  cnic: string;
}

const UserAppointBtn = ({ onClick, cnic }: UserAppointBtnProps) => {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const isDisabled = async () => {
      try {
        const res = await axios.post("/api/userHeader", { cnic });
        if (res.data.eligibilityStatus === "Eligible") {
          setDisable(false);
        } else {
          setDisable(true);
        }
      } catch (error) {
        console.log("Error checking eligibility:", error);
      }
    };
   isDisabled();
  }); 

  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`
        p-3 rounded-lg text-white transition-colors
        ${disable 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-red-600 hover:bg-red-700 cursor-pointer" 
        }
      `}
    >
      Schedule Donation
    </button>
  );
};

export default UserAppointBtn;