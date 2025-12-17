import connectionToDatabase from "@/lib/mongoose";
import RequestModel from "@/models/request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectionToDatabase();
    try {
       
        const res = await RequestModel.find(
            { status: false },
            { _id: 0, id: 1, hospId: 1, requests: 1 }
        );

        return NextResponse.json(res, { status: 200 });

    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch requests" }, 
            { status: 500 }
        );
    }
}