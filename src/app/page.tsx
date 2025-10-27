"use client"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleClick = (routeName:string)=>{
    router.push(`/${routeName}`);
  }
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-200">
    <div className="w-1/4  bg-white rounded-lg flex items-center flex-col  ">
      <div className="flex items-center m-2">
          <h1 className="bg-white rounded-4xl p-1 mr-1">❤️</h1>
          <h1 className="font-bold text-xl">BloodLife Portal</h1>
          </div>
      <h1 className=" p-2 text-center text-gray-400  ">Select your role to continue</h1>
      <div className=" w-full p-2 flex justify-center items-center flex-col  text-white ">
        <button onClick={()=>handleClick("user/login")} className="bg-red-500 hover:bg-red-600 w-full p-3 rounded-lg mb-3 h-1/3 cursor-pointer">🩸 Donor</button>
        <button onClick={()=>handleClick("staff/login")} className="bg-blue-500 hover:bg-blue-600 w-full p-3 rounded-lg mb-3 h-1/3 cursor-pointer">👨‍⚕️ Staff</button>
        <button onClick={()=>handleClick("hospital/login")} className="bg-green-500 hover:bg-green-600 w-full p-3 rounded-lg mb-3 h-1/3 cursor-pointer">🏥 Hospital</button>

      </div>
    </div>
</div>
  );
}
