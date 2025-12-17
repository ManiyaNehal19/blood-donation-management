import connectionToDatabase from "@/lib/mongoose";
import RequestModel from "@/models/request";
import blood from "@/models/blood";
import Transfusion from "@/models/transfusion";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await connectionToDatabase();
  
  try {
    const payload = await request.json(); 
    const {hospId, requests} = payload;
    const id_count = await RequestModel.countDocuments({});
    const id = `Req-${id_count+1}`;
    
    const newRequest = await RequestModel.create({id, hospId, requests});
    // const unfulfilledRequests: { [key: string]: number } = {};
    // const bloodTypes = Object.keys(requests);

    // for (const type of bloodTypes) {
    //   const amountRequested = requests[type];
      
    //   if (amountRequested > 0) {
    //   const fulfilledAmount = await returnFullfilled(type, amountRequested);
        
    //     const remainingAmount = amountRequested - fulfilledAmount;
    //     unfulfilledRequests[type] = remainingAmount;
    //   } else {
    //     unfulfilledRequests[type] = 0;
    //   }
    // }
    
    // const result = await Transfusion.create({ requestId: id, unfulfilled: unfulfilledRequests, hospId: hospId }); 
    // return NextResponse.json({ 
    //   message: "Request submitted and processed successfully", 
    //   data: newRequest, 
    //   fulfillmentSummary: result 
    // }, { status: 201 });
    return NextResponse.json({ 
      message: "Request submitted", 
     
    }, { status: 201 });


  } catch (error) {
    console.error("Error in request", error);
    return NextResponse.json({ 
            message: "Failed to submit request", 
            error: error 
        }, { status: 500 });
  }
}