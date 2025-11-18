"use client"
import HospHeader from '@/app/components/HospitalComponents/HospHeader'
import RequestButton from '@/app/components/HospitalComponents/RequestButton';
import RequestHistory from '@/app/components/HospitalComponents/RequestHistory';
// import { useState } from 'react';

const page = () => {

  return (
    <div className='flex items-center justify-center bg-blue-50 flex-col'>

      <HospHeader/>
      <RequestButton/>
      <RequestHistory/>
    </div>
  )
}

export default page