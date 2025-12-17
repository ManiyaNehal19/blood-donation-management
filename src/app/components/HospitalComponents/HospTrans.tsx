"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type BloodCounts = {
    [key: string]: number;
};

type TransfusionRecord = {
    _id: string;
    requestId: string;
    fulfilled: BloodCounts; 
    date: string;
};

interface HospTransProps {
    hospId: string; 
}

const HospTrans = ({ hospId }: HospTransProps) => {
    const [data, setData] = useState<TransfusionRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransfusions = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/transfusion`, { params: { id: hospId }});
                setData(response.data);
            } catch (error) {
                console.error("Error fetching transfusion history:", error);
            } finally {
                setLoading(false);
            }
        };

        if (hospId) {
            fetchTransfusions();
        }
    }, [hospId]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100 h-full flex flex-col justify-center">
                <p className="text-gray-400 font-medium">No transfusion history available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🚛</span> Transfusion History
            </h2>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {data.map((item) => (
                    <div 
                        key={item._id} 
                        className="border border-gray-100 bg-gray-50 rounded-2xl p-4 hover:border-blue-200 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
                                    {item.requestId}
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">
                                {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {Object.entries(item.fulfilled || {}).map(([type, amount]) => (
                                amount > 0 && (
                                    <div 
                                        key={type} 
                                        className="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1 rounded-lg"
                                    >
                                        <span className="text-red-600 font-bold text-xs">{type}</span>
                                        <div className="w-[1px] h-3 bg-gray-200"></div>
                                        <span className="text-gray-600 font-medium text-xs">{amount}ml</span>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            Dispatched to Hospital
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospTrans;