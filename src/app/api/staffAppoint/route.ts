import Appointment from "@/models/appoint";
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoose";

export async function GET(request: Request) {
    await connectionToDatabase();
    try {
       
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const pipeline = [
            {
                $match: {
                    date: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    },
                    status: false
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
                    appointmentTime: "$time",
                    bloodType: "$donorDetails.bloodGroup",
                    cnic: "$donorDetails.cnic"
                }
            }
        ];
        const finalAppointments = await Appointment.aggregate(pipeline);
        console.log(finalAppointments);
        return NextResponse.json(finalAppointments);

    } catch (error) {
        console.error("Error fetching and transforming appointments via aggregation:", error);
        return NextResponse.json(
            { error: "Failed to fetch and process appointment data" },
            { status: 500 }
        );
    }
}