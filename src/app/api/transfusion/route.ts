import connectionToDatabase from "@/lib/mongoose";
import RequestModel from "@/models/blood"; 
import Transfusion from "@/models/transfusion";
import { NextResponse } from "next/server";
// export async function GET(request: Request) {
//     await connectionToDatabase();

//     try {
//         const { searchParams } = new URL(request.url);
//         const hospId = searchParams.get("hospId")?.trim() as string;
//         console.log(hospId, "In router ((((((((((((((((((((((((((((")

//         if (!hospId) {
//             return NextResponse.json({ error: "hospId is required" }, { status: 400 });
//         }
//         const hospitalRequests = await RequestModel.find(
//             { hospId: hospId }, 
//             { id: 1, _id: 0 }
//         );
//         console.log(hospitalRequests, "=======@@@@@@@@@@@@@@@@@")
//         const requestIds = hospitalRequests.map(req => req.id);
//         console.log("requestIds%%%%%%%%%%%%%%%%%%%%%%%%%", requestIds)

//         if (requestIds.length === 0) {
//             return NextResponse.json([], { status: 200 });
//         }
//         const history = await Transfusion.find({
//             requestId: { $in: requestIds }
//         }); 
//         console.log(history, "***********************************************")
//         return NextResponse.json(history, { status: 200 });

//     } catch (error) {
//         console.error("Fetch error:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
export async function GET(request: Request) {
    await connectionToDatabase();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); 

        const hospitalRequests = await RequestModel.find(
            { hospId: id }, 
            { _id: 0, id: 1 } 
        ).lean();
        const requestIds = hospitalRequests.map(req => req.id);

        if (requestIds.length === 0) {
            return NextResponse.json([], { status: 200 });
        }
        const history = await Transfusion.find({
            requestId: { $in: requestIds }
        }).lean();

        return NextResponse.json(history, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}