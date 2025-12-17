// "use client"
// import axios from 'axios'
// import { useParams } from 'next/navigation'
// import { useState, useEffect } from 'react'

// type HisotoryRequest = {
//   requests: {
//    "A+": number;
//    "A-": number;
//    "B+": number;
//    "B-": number;
//    "AB+": number;
//    "AB-": number;
//    "O+": number;
//    "O-": number;
//   },
//   id: string,
//   date: Date
// }

// const RequestHistory = () => {
//   const [history, setHistory] = useState<HisotoryRequest[]>([]);
//   const params = useParams();
//   const hospId = Array.isArray(params.id) ? params.id[0] : params.id;

//   useEffect(() => {
//     async function getHistory() {
//       try {
//         const response = await axios.get("/api/history", { params: { id: hospId } });
        
//                 const dataArray = response.data?.res || response.data;
//         const top5History = (dataArray as HisotoryRequest[]).slice(0, 5);
        
//         setHistory(top5History);
//       } catch (error) {
//         console.error("Error fetching request history:", error);
//       }
//     }
    
//     getHistory();
    
//   }, [hospId]); 

//   return (
//     <div className="p-6 w-full">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         🏥 Request History
//       </h2>
//       {history.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           {hospId ? "No recent requests found." : "Loading hospital ID..."}
//         </div>
//       ) : (
//         <div className="space-y-3">
//                     <div className="hidden md:flex items-center justify-between p-3 border-b-2 border-red-200 font-semibold text-gray-600 bg-red-50 rounded-t-lg">
//                         <div className="w-1/4">Request ID & Date</div>
//                         <div className="w-3/4 text-right pr-4">Requested Blood Volumes (Units/ml)</div>
//                     </div>

//           {history.map((request) => (
//             <div 
//               key={request.id} 
//               className="flex flex-col md:flex-row md:items-center justify-between 
//                 bg-white shadow-md rounded-lg p-4 border-l-4 border-red-600 
//                 transition duration-300 hover:shadow-xl"
//             >
//                             <div className="flex flex-col mb-2 md:mb-0 md:w-1/4">
//                                 <span className="text-md font-bold text-gray-800 flex items-center">
//                                     <span className="text-red-600 mr-2">#</span>
//                                     {request.id}
//                                 </span>
//                                 <span className="text-xs text-gray-500 mt-1 md:mt-0">
//                                     {new Date(request.date).toLocaleString()}
//                                 </span>
//                             </div>

//                             <div className="flex flex-wrap gap-x-6 gap-y-2 md:w-3/4 md:justify-end">
//                 {Object.entries(request.requests) 
//                   .filter(([, volume]) => volume > 0) 
//                   .map(([bloodGroup, volume]) => ( 
//                     <div 
//                       key={bloodGroup} 
//                       className="text-sm bg-red-100 px-3 py-1 rounded-full whitespace-nowrap"
//                     >
//                       <span className="font-bold text-red-800">{bloodGroup}</span>: 
//                       <span className="text-gray-700">{volume} units/ml</span>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default RequestHistory;
"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type CombinedHistory = {
  id: string;
  date: Date;
  requests: { [key: string]: number };
  transfusionData: { [key: string]: number } | null;
  transfusionDate: string | null;
}

const UnifiedHistory = () => {
  const [history, setHistory] = useState<CombinedHistory[]>([]);
  const params = useParams();
  const hospId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await axios.get("/api/history", { params: { id: hospId } });
        setHistory(response.data.res || []);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (hospId) getHistory();
  }, [hospId]);

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📊 Request & Transfusion Overview
      </h2>
      
      <div className="space-y-6">
        {history.map((item) => (
          <div key={item.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <div>
                <span className="font-bold text-blue-600">#{item.id}</span>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${item.transfusionData ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {item.transfusionData ? "✓ DISPATCHED" : "⏳ PENDING"}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Left: Requested */}
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Requested</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(item.requests).filter(([, v]) => v > 0).map(([type, vol]) => (
                      <div key={type} className="bg-red-50 border border-red-100 px-2 py-1 rounded text-sm">
                        <span className="font-bold text-red-700">{type}</span>: {vol}ml
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-l pl-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">UnFulfilled</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.transfusionData ? (
                      Object.entries(item.transfusionData).filter(([, v]) => v > 0).map(([type, vol]) => (
                        <div key={type} className="bg-emerald-50 border border-emerald-100 px-2 py-1 rounded text-sm">
                          <span className="font-bold text-emerald-700">{type}</span>: {vol}ml
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400 italic">No fulfillment data yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnifiedHistory;