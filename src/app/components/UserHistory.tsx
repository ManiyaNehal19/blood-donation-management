"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const UserHistory = ({ cnic }: { cnic: string }) => {
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    if (!cnic) return;
    const fetchUserHistory = async () => {
      try {
        const res = await axios.get("/api/userHistory", { params: { cnic } });
        console.log(res.data.user, "--------------------User in function");
        setUserHistory(res.data.user || []);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };
    fetchUserHistory();
  }, [cnic]);

  
  return <div></div>;
};

export default UserHistory;
