"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type HisotoryRequest = {
  requests: {
   "A+": number;
   "A-": number;
   "B+": number;
   "B-": number;
   "AB+": number;
   "AB-": number;
   "O+": number;
   "O-": number;
  },
  id: string,
  date: Date
}

const RequestHistory = () => {
  const [history, setHistory] = useState<HisotoryRequest[]>([]);
  const params = useParams();
  const hospId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await axios.get("/api/history", { params: { id: hospId } });
        
                const dataArray = response.data?.res || response.data;
        const top5History = (dataArray as HisotoryRequest[]).slice(0, 5);
        
        setHistory(top5History);
      } catch (error) {
        console.error("Error fetching request history:", error);
      }
    }
    
    getHistory();
    
  }, [hospId]); 

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🏥 Request History (Top 5)
      </h2>
      {history.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {hospId ? "No recent requests found." : "Loading hospital ID..."}
        </div>
      ) : (
        <div className="space-y-3">
                    <div className="hidden md:flex items-center justify-between p-3 border-b-2 border-red-200 font-semibold text-gray-600 bg-red-50 rounded-t-lg">
                        <div className="w-1/4">Request ID & Date</div>
                        <div className="w-3/4 text-right pr-4">Requested Blood Volumes (Units/ml)</div>
                    </div>

          {history.map((request) => (
            <div 
              key={request.id} 
              className="flex flex-col md:flex-row md:items-center justify-between 
                bg-white shadow-md rounded-lg p-4 border-l-4 border-red-600 
                transition duration-300 hover:shadow-xl"
            >
                            <div className="flex flex-col mb-2 md:mb-0 md:w-1/4">
                                <span className="text-md font-bold text-gray-800 flex items-center">
                                    <span className="text-red-600 mr-2">#</span>
                                    {request.id}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 md:mt-0">
                                    {new Date(request.date).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 md:w-3/4 md:justify-end">
                {Object.entries(request.requests) 
                  .filter(([, volume]) => volume > 0) 
                  .map(([bloodGroup, volume]) => ( 
                    <div 
                      key={bloodGroup} 
                      className="text-sm bg-red-100 px-3 py-1 rounded-full whitespace-nowrap"
                    >
                      <span className="font-bold text-red-800">{bloodGroup}</span>: 
                      <span className="text-gray-700">{volume} units/ml</span>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RequestHistory;