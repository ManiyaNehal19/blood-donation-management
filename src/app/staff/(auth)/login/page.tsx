"use client"
import { useState, } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e)=>{
   e.preventDefault();
   setErrorMessage("");
   try {
    console.log(email, password,"email password in handlesubmti");
    const result = await axios.post("/api/staff", { email, password });
    const staffCnic = result.data.staff.CNIC; 
    router.push(`/staff/dashboard/${staffCnic}`); 

   } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
     setErrorMessage(error.response.data.message || "Login failed. Please check your credentials.");
    } else {
     setErrorMessage("An unexpected error occurred during login.");
    }
   }
  }
 return (
  <div className="flex justify-center items-center w-full h-screen bg-linear-to-br from-red-100 via-gray-100 to-white">
   <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
    <div className="flex items-center mb-6">
     <span className="text-2xl">❤️</span>
     <h1 className="font-bold text-2xl ml-2 text-gray-700">BloodLife Portal</h1>
    </div>

    <h2 className="text-lg text-gray-500 mb-6">Login to your staff account</h2>
    <form className="w-full flex flex-col gap-5" onSubmit={(e)=>handleSubmit(e)}>
     {errorMessage && (
      <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg text-sm">
       {errorMessage}
      </div>
     )}
     <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-600 mb-1 text-sm font-medium">
       Email
      </label>
      <input
       type="email"
       id="user_email"
       placeholder="Enter your email"
       required
       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
       onChange={(e)=>setEmail(e.target.value)}
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
       required
       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
       onChange={(e)=>setpassword(e.target.value)}
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