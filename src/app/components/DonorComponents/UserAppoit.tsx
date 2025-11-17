"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type userAppointments = {
  _id: string;
  donorCnic: string;
  date: string;
  time: string;
};

const UserAppoit = ({ cnic }: { cnic: string }) => {
  const [appointment, setappointment] = useState<userAppointments[]>([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res = await axios.get("/api/appointment", { params: { cnic } });
        setappointment(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    getAppointments();
  }, [cnic]);

  if (!appointment || appointment.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="text-blue-600 mr-2 text-2xl">📅</span> Upcoming Appointments
        </h2>
        <p className="text-gray-500">No appointments scheduled.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 w-4/5 mx-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <span className="text-blue-600 mr-2 text-2xl">📅</span> Upcoming Appointments
      </h2>

      <div>
        {appointment.map((app) => (
          <div
            key={app._id}
            className="flex justify-between items-center mb-3 border-l-4 border-blue-500 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <h3 className="font-semibold text-gray-800">Blood Donation Appointment</h3>

              <p className="text-sm text-gray-500">
                {new Date(app.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {app.time}
              </p>

              <p className="text-blue-600 font-medium mt-1">
                ⏳ Scheduled
              </p>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppoit;
