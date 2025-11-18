"se client"
import React from 'react'
import { useState } from 'react';
import RequestPopUp from './RequestPopUp';
import { useParams } from 'next/navigation';

const RequestButton = () => {
    const [request_pop, setresquest_pop] = useState(false);
    const params = useParams();
    const hospId = params.id?.toString() || "";
  return (
    <div className='w-6/10 flex justify-center items-center mt-4'>
       {request_pop && <RequestPopUp hospId={hospId} onClose={()=> (setresquest_pop(false))}/>}
     <button className='w-full text-center bg-red-500 text-white p-4 hover:bg-red-600 rounded-lg font-medium'
        onClick={()=>setresquest_pop(true)}>
         + Request Blood
        </button>
      </div>
  )
}

export default RequestButton