import connectionToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Eligible from "@/models/eligibility";
import Appointment from "@/models/appoint";

export async function POST(request:Request){
    await connectionToDatabase();
    try {
        const {donorCnic, hemoglobin, bloodPressure, weight, date}= await request.json();
        let status = false;
        const parsedDate = Date.now();
        if(hemoglobin>=12.5 && (bloodPressure>=100 && bloodPressure<=180) && weight>=50){
            status = true;
           const updateResult = await Appointment.findOneAndUpdate(
                { 
                    donorCnic: donorCnic, 
                    date: date 
                }, 
                { status: true}, 
                { new: true } 
            );
            console.log("update of appoint", updateResult);

            
        }
        const res = await Eligible.create({donorCnic, hemoglobin, bloodPressure, weight, date:parsedDate, status, completed:false})
        return NextResponse.json({message: "Added sucessfully"}, {status:201});
    } catch (error) {
        console.log(error);
    }

}