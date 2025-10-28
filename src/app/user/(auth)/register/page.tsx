"use client";

import React from "react";

const DonorRegister = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen bg-linear-to-br from-red-100 via-gray-100 to-white overflow-y-auto py-8">
      <div className="flex flex-col justify-center items-center text-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Join Our Life Saving Community
        </h2>
        <p className="text-gray-700 mt-2 w-full">
          Complete the registration form below to become a blood donor and help save lives in your community.
        </p>
      </div>
      <div className="w-3/4  bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <span className="text-2xl">🧑🩸</span>
          <h1 className="font-bold text-2xl ml-2 text-gray-700 text-left">
           Donor Registeration
          </h1>
        </div>


        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Gender
              </label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Contact
              </label>
              <input
                type="tel"
                placeholder="0300-1234567"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                City
              </label>
              <input
                type="text"
                placeholder="Karachi"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Blood Group
              </label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="">Select</option>
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
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          {["Diseases (if any)", "Allergies (if any)", "Prescriptions (if any)"].map((label, i) => (
            <div className="flex flex-col" key={i}>
              <label className="text-gray-600 mb-1 text-sm font-medium">
                {label}
              </label>
              <input
                type="text"
                placeholder={`Enter ${label} separated by spaces `}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-all duration-200 mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegister;
