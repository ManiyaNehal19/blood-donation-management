import connectionToDatabase from "@/lib/mongoose";
import RequestModel from "@/models/request";
import next from "next";
import { NextResponse } from "next/server";
export async function GET(request:Request){
    await connectionToDatabase();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const res = await RequestModel.find({hospId:id},{_id:0, id:1, requests:1, date:1});
        console.log(res);
        return NextResponse.json({res}, {status:201});
    } catch (error) {
        console.log(error);
    }
}