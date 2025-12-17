"use client";
import React, { useState } from "react";

type UserHistoryRecord = {
  _id: string;
  cnic: string;
  historyDate: string;
  bloodVolume: number;
  unitId: string;
};

interface UserHistoryProps {
  user: UserHistoryRecord[];
}

const UserHistory = ({ user }: UserHistoryProps) => {
  const [showAll, setShowAll] = useState(false);

  if (!user || user.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="text-red-600 mr-2 text-2xl">🩸</span> Donation History
        </h2>
        <p className="text-gray-500">No donation records found.</p>
      </div>
    );
  }

  const displayedHistory = showAll ? user : user.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="text-red-600 mr-2 text-2xl">📋</span> Donation History
        </h2>
    
        {user.length > 3 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-md text-blue-500 cursor-pointer hover:underline font-medium"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {displayedHistory.map((record) => (
          <div
            key={record._id}
            className="flex justify-between cursor-pointer items-center border-l-4 border-green-500 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-semibold text-gray-800">Whole Blood Donation</h3>
              <p className="text-sm text-gray-500">
                {new Date(record.historyDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • Blood Center
              </p>
              <p className="text-green-600 font-medium mt-1 text-sm">
                ✅ Completed Successfully
              </p>
            </div>
            <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
              {record.bloodVolume}ml
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;