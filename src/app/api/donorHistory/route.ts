import connectionToDatabase from "@/lib/mongoose";
import blood from "@/models/blood";
import DonorHistory from "@/models/donor-history";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    await connectionToDatabase();
    try {
        const Id = await blood.countDocuments({}) + 1;
        const unitId = `UNIT-${Id}`
        const {cnic, bloodVolume,  historyDate} = await request.json();
        const res = await DonorHistory.insertOne({cnic, bloodVolume, unitId, historyDate});
        return NextResponse.json({message:"Created a history"}, {status:201});
    } catch (error) {
        console.log(error);
    }
}
