import connectionToDatabase from '@/lib/mongoose'
import Donor from '@/models/donor';
import React from 'react'

const UserHeader = async ({cnic}:{cnic:string}) => {
    await connectionToDatabase();
    const user = await Donor.findOne({cnic:cnic});
    console.log(user.bloodGroup);

    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
             
               {/* <div
                 key={head.name}
                 className="flex items-center  rounded-xl p-5 shadow-md bg-white border-l-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
                 style={{ borderLeftColor: head.color }}
               >
                 <div className="text-4xl mb-2">{head.emoji}</div>
                 <div>
                 <h4 className="text-lg font-semibold">{head.name}</h4>
                 <p className="text-sm mt-1 font-medium opacity-80">
                   {head.attribute}
                 </p>
                 </div>
                
               </div> */}
           
           </div> 
  )
}

export default UserHeader 