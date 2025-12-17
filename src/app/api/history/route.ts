// import connectionToDatabase from "@/lib/mongoose";
// import RequestModel from "@/models/request";
// import next from "next";
// import { NextResponse } from "next/server";
// export async function GET(request:Request){
//     await connectionToDatabase();
//     try {
//         const { searchParams } = new URL(request.url);
//         const id = searchParams.get("id");
//         const res = await RequestModel.find({hospId:id},{_id:0, id:1, requests:1, date:1});
//         console.log(res);
//         return NextResponse.json({res}, {status:201});
//     } catch (error) {
//         console.log(error);
//     }
// }
import connectionToDatabase from "@/lib/mongoose";
import RequestModel from "@/models/request";
import Transfusion from "@/models/transfusion";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectionToDatabase();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 
        const requests = await RequestModel.find(
            { hospId: id },
            { _id: 0, id: 1, requests: 1, date: 1 }
        ).sort({ date: -1 }).lean();
         console.log(requests, "_____________________");
        
        
        const requestIds = requests.map(r => r.id);
        
        console.log(requestIds,"++");
        const transfusions = await Transfusion.find({
            requestId: { $in: requestIds }
        }).lean();
        // console.log(transfusions, "+++");
        

        const combined = requests.map(req => {
            const transfusion = transfusions.find(t => t.requestId === req.id);
            return {
                ...req,
              
                transfusionData: transfusion ? transfusion.unfulfilled : null,
                transfusionDate: transfusion ? transfusion.date : null
            };
        });
        console.log(combined,"]]]]")
        return NextResponse.json({ res: combined }, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}