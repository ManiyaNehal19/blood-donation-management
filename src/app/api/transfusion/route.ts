import connectionToDatabase from "@/lib/mongoose";
import blood from "@/models/blood";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Transfusion from "@/models/transfusion";
interface BloodUnitDocument extends mongoose.Document {
    left: number;
    unitId: string;
}

/**
 * Finds available blood units and allocates the amount requested,
 * updating the 'left' field in the database.
 * @param type The blood type requested (e.g., 'A+', 'O-').
 * @param amountReq The total amount requested.
 * @returns The total amount successfully fulfilled.
 */
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
            fullfilled += amountToTake;
            remainingAmountToFulfill = 0; 

        } else {
            amountToTake = item.left;
            
            fullfilled += amountToTake;
            remainingAmountToFulfill -= amountToTake;
            item.left = 0; 
        }
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
        const { id, requests } = payload;
        
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
        
        console.log("Unfulfilled Requests:", unfulfilledRequests);
        const result = await Transfusion.insertOne({id, unfulfilledRequests});
        
        return NextResponse.json({ 
            message: "Request processed successfully", 
            requestId: id, 
            unfulfilled: unfulfilledRequests 
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to process request", error }, { status: 500 });
    }
}