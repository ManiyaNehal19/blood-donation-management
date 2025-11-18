import connectionToDatabase from "@/lib/mongoose";
import RequestModel from "@/models/request";
import blood from "@/models/blood";
import Transfusion from "@/models/transfusion";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
interface BloodUnitDocument extends mongoose.Document {
  left: number;
  unitId: string; 
}

async function returnFullfilled(type: string, amountReq: number): Promise<number> {
  const bloodLifespanDays = 42;
  const expiryCutoffDate = new Date(Date.now() - bloodLifespanDays * 24 * 60 * 60 * 1000);
  const availableUnits: BloodUnitDocument[] = await blood
    .find({ type: type, date: { $gte: expiryCutoffDate }, left: { $gt: 0 } }, { _id: 0, left: 1, unitId: 1 })
    .sort({ date: 1 }) 
    .lean(); 

  let fullfilled = 0;
  let remainingAmountToFulfill = amountReq;
  const updates = [];
  for (const item of availableUnits) {
    if (remainingAmountToFulfill <= 0) {
      break;
    }

    let amountToTake = 0;
    
    if (remainingAmountToFulfill <= item.left) {
      amountToTake = remainingAmountToFulfill;
      item.left -= amountToTake;
      remainingAmountToFulfill = 0; 
    } else {
      amountToTake = item.left;
      remainingAmountToFulfill -= amountToTake;
      item.left = 0; 
    }
        
        fullfilled += amountToTake; 

    updates.push({
      unitId: item.unitId,
      newLeftValue: item.left,
    });
  }
  const updatePromises = updates.map(update =>
    blood.findOneAndUpdate({ unitId: update.unitId }, { $set: { left: update.newLeftValue } }).exec()
  );
  await Promise.all(updatePromises);
  
  return fullfilled;
}
export async function POST(request: Request) {
  await connectionToDatabase();
  
  try {
    const payload = await request.json(); 
    const {hospId, requests} = payload;
    const id_count = await RequestModel.countDocuments({});
    const id = `Req-${id_count+1}`;
    
    const newRequest = await RequestModel.create({id, hospId, requests});
    const unfulfilledRequests: { [key: string]: number } = {};
    const bloodTypes = Object.keys(requests);

    for (const type of bloodTypes) {
      const amountRequested = requests[type];
      
      if (amountRequested > 0) {
      const fulfilledAmount = await returnFullfilled(type, amountRequested);
        
        const remainingAmount = amountRequested - fulfilledAmount;
        unfulfilledRequests[type] = remainingAmount;
      } else {
        unfulfilledRequests[type] = 0;
      }
    }
    
    const result = await Transfusion.create({ requestId: id, unfulfilled: unfulfilledRequests, hospId: hospId }); 
    return NextResponse.json({ 
      message: "Request submitted and processed successfully", 
      data: newRequest, 
      fulfillmentSummary: result 
    }, { status: 201 });

  } catch (error) {
    console.error("Error processing request and fulfillment:", error);
    return NextResponse.json({ 
            message: "Failed to submit and process request", 
            error: error 
        }, { status: 500 });
  }
}