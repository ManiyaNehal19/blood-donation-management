"use client"
import hospital from '@/models/hospital';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const HospHeader = () => {
    type hospitalInfotype= {
        name:string,
        hospId: string,
        address:string,
        phone:number}
    const params = useParams();
    const hospId = params.id?.toString();
  
    const [hospitalInfo, sethospitalinfo] = useState<hospitalInfotype>({
        name: "",
        hospId:"0",
        address:"",
        phone: 1234
    });
    
    useEffect(()=>{
        async function getHeader(){
            try {
                const res = await axios.get("/api/hospital", {params:{id:hospId}});
                sethospitalinfo(res.data.getHospitalnfo);
            } catch (error) {
                console.log(error);
            }
        }
        getHeader();
    }, [])
    console.log(hospitalInfo," +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

  return (
  <div className="w-6/10  p-6 rounded-lg shadow-lg mt-3 bg-green-50  border-l-4 border-green-500">

    <table className="w-full border-collapse ">
      <thead>
        <tr className=" text-black">
          <th className="py-3 px-4  text-left">Name</th>
          <th className="py-3 px-4  text-left">Address</th>
          <th className="py-3 px-4  text-left">Phone</th>
        </tr> 
      </thead>

      <tbody>
        <tr className=" text-black">
          <td className="py-3 px-4 ">{hospitalInfo.name}</td>
          <td className="py-3 px-4 ">{hospitalInfo.address}</td>
          <td className="py-3 px-4 ">{hospitalInfo.phone}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

}

export default HospHeader