"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

type BloodCounts = {
    "A+": number; "A-": number;
    "B+": number; "B-": number;
    "AB+": number; "AB-": number;
    "O+": number; "O-": number;
}

type Request = {
    id: string;
    hospId: string;
    requests: BloodCounts;
}

const HospReq = () => {
    const [refreshBtn, setBntn] = useState(0);
    const [getreq, setreq] = useState<Request[]>([]);
    const [messages, setMessages] = useState<Record<string, { text: string, type: 'success' | 'error' }>>({});

    useEffect(() => {
        async function getRequests() {
            try {
                const response = await axios.get("/api/staffReq");
                setreq(response.data);
            } catch (error) {
                console.log("Error fetching:", error);
            }
        }
        getRequests();
    }, [refreshBtn]);

    const handleAction = async (id: string, action: 'fulfill' | 'reject') => {
        try {
            const res = await axios.post("/api/transfusionHandle", {id:id});

            // Logic for API call would go here
            // await axios.post('/api/action', { id, action });

           
            const newMessage = action === 'fulfill' 
                ? { text: "Successfully Fulfilled", type: 'success' as const }
                : { text: "Marked as Not Fulfilled", type: 'error' as const };

            setMessages(prev => ({ ...prev, [id]: newMessage }));

            

        } catch (error) {
            setMessages(prev => ({ 
                ...prev, 
                [id]: { text: "Error updating request", type: 'error' } 
            }));
        }
    };

    return (
        <div className='bg-white row-span-2 col-start-5 row-start-4 flex flex-col h-[650px] overflow-scroll p-6 rounded-lg shadow-md border border-gray-100'>
            <h2 className="text-xl font-semibold mb-4 text-center">Hospital Requests</h2>
            
            <button 
                onClick={() => setBntn(prev => prev + 1)}
                className="text-center w-full text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 py-2 mb-6 transition-colors"
            >
                Refresh Request
            </button>

            <div className="space-y-4">
                {getreq.map((item) => (
                    <div key={item.id} className="rounded-2xl p-5 shadow-sm bg-gray-50 border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-gray-400 font-mono">ID: {item.id.slice(-6)}</span>
                            <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{item.hospId}</span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {Object.entries(item.requests).map(([bloodType, count]) => (
                                count > 0 && (
                                    <div key={bloodType} className="flex flex-col items-center bg-white p-2 rounded-lg border border-gray-100">
                                        <span className="text-red-600 font-bold text-xs">{bloodType}</span>
                                        <span className="text-gray-800 font-medium text-xs">{count}ml</span>
                                    </div>
                                )
                            ))}
                        </div>

                     
                        {messages[item.id] ? (
                            <div className={`py-2 px-4 rounded-xl text-center text-xs font-bold animate-pulse ${
                                messages[item.id].type === 'success' 
                                ? "bg-green-100 text-green-700 border border-green-200" 
                                : "bg-red-100 text-red-700 border border-red-200"
                            }`}>
                                {messages[item.id].text}
                            </div>
                        ) : (
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => handleAction(item.id, 'fulfill')}
                                    className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-all active:scale-95"
                                >
                                    Fulfill
                                </button>
                                
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HospReq;