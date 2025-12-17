"use client"
import HospHeader from '@/app/components/HospitalComponents/HospHeader'
import HospTrans from '@/app/components/HospitalComponents/HospTrans';
import RequestButton from '@/app/components/HospitalComponents/RequestButton';
import UnifiedHistory from '@/app/components/HospitalComponents/RequestHistory';
import RequestHistory from '@/app/components/HospitalComponents/RequestHistory';


const page = () => {

  return (
    <div className='flex items-center justify-center bg-blue-50 h-full flex-col'>

      <HospHeader/>
      <RequestButton/>
      <UnifiedHistory/>
      
    </div>
  )
}

export default page