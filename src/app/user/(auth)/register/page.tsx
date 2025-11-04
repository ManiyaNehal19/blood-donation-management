"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DonorRegister = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [diseases, setDiseases] = useState("");
  const [allergies, setAllergies] = useState("");
  const [prescriptions, setPrescriptions] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/donors",{firstName, lastName, dob, gender, contact, cnic, email, city, bloodGroup, password
      } );
      router.push("/user/dashboard");
    } catch (error) {
      console.log(error)
    }
  };

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

      <div className="w-3/4 bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <span className="text-2xl">👤</span>
          <h1 className="font-bold text-2xl ml-2 text-gray-700">
            Donor Registration
          </h1>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
       
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
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
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact, CNIC, Email */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Contact
              </label>
              <input
                type="tel"
                placeholder="0300-1234567"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                CNIC
              </label>
              <input
                type="text"
                placeholder="42101-1234567-1"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                pattern="\d{5}-\d{7}-\d{1}"
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-600 mb-1 text-sm font-medium">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 text-sm font-medium">
              Diseases (if any)
            </label>
            <input
              type="text"
              placeholder="Enter diseases separated by commas"
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 text-sm font-medium">
              Allergies (if any)
            </label>
            <input
              type="text"
              placeholder="Enter allergies separated by commas"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1 text-sm font-medium">
              Prescriptions (if any)
            </label>
            <input
              type="text"
              placeholder="Enter prescriptions separated by commas"
              value={prescriptions}
              onChange={(e) => setPrescriptions(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

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
