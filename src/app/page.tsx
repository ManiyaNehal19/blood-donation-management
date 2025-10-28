"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = (routeName: string) => {
    router.push(`/${routeName}`);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-linear-to-br from-red-100 via-gray-100 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center mb-6">
          <span className="text-2xl">❤️</span>
          <h1 className="font-bold text-2xl ml-2 text-gray-700">BloodLife Portal</h1>
        </div>

        <h2 className="text-lg text-gray-500 mb-6 text-center">
          Select your role to continue
        </h2>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-4 text-white">
          <button
            onClick={() => handleClick("user/login")}
            className="bg-red-500 hover:bg-red-600 w-full py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
          >
            🩸 Donor
          </button>

          <button
            onClick={() => handleClick("staff/login")}
            className="bg-blue-500 hover:bg-blue-600 w-full py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
          >
            👨‍⚕️ Staff
          </button>

          <button
            onClick={() => handleClick("hospital/login")}
            className="bg-green-500 hover:bg-green-600 w-full py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
          >
            🏥 Hospital
          </button>
        </div>
      </div>
    </div>
  );
}
