import connectionToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Eligible from "@/models/eligibility";
import Appointment from "@/models/appoint";

export async function POST(request: Request) {
    await connectionToDatabase();
    try {
        const { donorCnic, hemoglobin, bloodPressure, weight, date } = await request.json();
        let status = false;
        const parsedDate = new Date();
        parsedDate.setHours(0, 0, 0, 0);;
        if (hemoglobin >= 12.5 && (bloodPressure >= 100 && bloodPressure <= 180) && weight >= 50) {
            status = true;
            await Appointment.findOneAndUpdate(
                { donorCnic: donorCnic, date: date }, 
                { status: true, completed:true }, 
                { new: true } 
            );
        }
        const res = await Eligible.findOneAndUpdate(
            { 
                donorCnic: donorCnic, 
                date: parsedDate 
            },
            { 
                hemoglobin, 
                bloodPressure, 
                weight, 
                status, 
                completed: false 
            },
            { 
                new: true, 
                upsert: true, 
                runValidators: true 
            }
        );
        const message = status ? "Eligible" : "Not Eligible";
        
        return NextResponse.json({ message: message, data: res }, { status: 200 });
    } catch (error) {
        console.error("Eligibility Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}