"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHistory from "./StaffComponents/UserHistory"; 

interface UserInfoProps {
  cnic: string;
}

const UserInfo = ({ cnic }: UserInfoProps) => {
  const [user, setUser] = useState<any>(null);
  const [userMed, setUsermed] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userHistory, setUserHistory] = useState<any[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      if (!cnic) return;
      try {
        const res = await axios.get("/api/donors", { params: { cnic } });
        const res2 = await axios.get("/api/medicalHis", {params: {cnic}});
        if (!ignore && res.data.user) {
          setUser(res.data.user);
          setUsermed(res2.data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    return () => {
      ignore = true;
    };
  }, [cnic]);

  useEffect(() => {
    async function fetchUserHistory() {
      if (!cnic) return;
      try {
        const res = await axios.get("/api/userHistory", { params: { cnic } });
        console.log(res.data.user, "--------------------User in function");
        setUserHistory(res.data.user || []);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    }

    fetchUserHistory();
  }, [cnic]);
  return (
    <>
      {loading ? (
        <div className="flex bg-white justify-center items-center py-6 text-gray-600">
          Loading user info...
        </div>
      ) : user ? (
        <>
          <div className="bg-white h-full rounded-xl shadow-md p-6 mt-6 w-4/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-purple-600 mr-2 text-2xl">👤</span> Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="First Name" value={user.firstName} />
              <Info label="Last Name" value={user.lastName} />
              <Info label="Email Address" value={user.email} />
              <Info label="Phone Number" value={user.contact} />
              <Info label="Date of Birth" value={user.dob ? user.dob.split("T")[0] : "—"} />
              <Info label="Blood Group" value={user.bloodGroup} />
              <Info label="City" value={user.city} />
              <Info label="CNIC" value={user.cnic} />
              <Info label="Gender" value={user.gender} />
              <Info label="Prescriptions" value={userMed.prescriptions?.toString()}/>
              <Info label="Allergies" value={userMed.allergies?.toString()}/>
              <Info label="Diseases" value={userMed.diseases?.toString()}/>

            </div>
          </div>

        
          <UserHistory user={userHistory} />
        </>
      ) : (
        <div className="flex justify-center items-center py-6 text-red-500">
          No user found.
        </div>
      )}
    </>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <div className="w-full border rounded-lg px-3 py-2">{value || "—"}</div>
  </div>
);

export default UserInfo;
