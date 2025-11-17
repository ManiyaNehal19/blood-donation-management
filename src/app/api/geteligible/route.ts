import connectionToDatabase from "@/lib/mongoose";
import Eligible from "@/models/eligibility";
import { NextResponse } from "next/server";

export async function GET() {
    await connectionToDatabase();
    const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
    try {
      const pipeline = [
            {
                $match: {
                    date: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    },
                    status: true,
                    completed:false
                }
            },
            {
                $lookup: {
                    from: "donors",
                    localField: "donorCnic",
                    foreignField: "cnic", 
                    as: "donorDetails",
                }
            },{
                $unwind: "$donorDetails"
            },{
                $project: {
                    _id: 0,
                    firstName: "$donorDetails.firstName",
                    lastName: "$donorDetails.lastName",
                    bloodType: "$donorDetails.bloodGroup",
                    cnic: "$donorDetails.cnic"
                }
            }
        ];
        const finalAppointments = await Eligible.aggregate(pipeline);
        console.log(finalAppointments);
        return NextResponse.json(finalAppointments);

    } catch (error) {
        console.log(error);
    }
}