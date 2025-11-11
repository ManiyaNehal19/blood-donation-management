"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserInfoProps {
  cnic: string;
}

const UserInfo = ({ cnic }: UserInfoProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cnic) return;

    let ignore = false;

    async function fetchUser() {
      try {
        const res = await axios.get("/api/donors", { params: { cnic } });
        if (!ignore && res.data.user) {
          setUser(res.data.user);
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

  if (loading)
    return (
      <div className="flex justify-center items-center py-6 text-gray-600">
        Loading user info...
      </div>
    );

  

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 ">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="text-purple-600 mr-2 text-2xl">👤</span> Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.firstName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.lastName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.email}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.contact}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date of Birth
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.dob ? user.dob.split("T")[0] : "—"}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Blood Group
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.bloodGroup}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            City
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.city}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            CNIC
          </label>
          <div className="w-full border rounded-lg px-3 py-2 ">
            {user.cnic}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Gender
          </label>
          <div className="w-full border rounded-lg px-3 py-2  capitalize">
            {user.gender}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
