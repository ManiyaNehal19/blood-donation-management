"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setError("");

    try {
      console.log(email, password, "email password in handlesubmit");
      const result = await axios.post("/api/hospital", { email, password });
      const id = result.data.id;
      router.push(`/hospital/dashboard/${id}`);
    } catch (err) {
      
      
      setError("Invalid email or password. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-linear-to-br from-red-100 via-gray-100 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <span className="text-2xl">❤️</span>
          <h1 className="font-bold text-2xl ml-2 text-gray-700">BloodLife Portal</h1>
        </div>

        <h2 className="text-lg text-gray-500 mb-6">Login to your hospital account</h2>

       
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm text-center font-medium animate-pulse">
            {error}
          </div>
        )}

        <form className="w-full flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col">
            <label htmlFor="user_email" className="text-gray-600 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="user_email"
              placeholder="Enter your email"
              className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                error ? "border-red-400" : "border-gray-300"
              }`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${
                error ? "border-red-400" : "border-gray-300"
              }`}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-all duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;