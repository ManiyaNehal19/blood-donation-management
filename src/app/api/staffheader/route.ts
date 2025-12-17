import connectionToDatabase from "@/lib/mongoose";
import Appointment from "@/models/appoint";
import blood from "@/models/blood";
import Donor from "@/models/donor";
import RequestModel from "@/models/request";
import { NextResponse } from "next/server";

export async function GET() {
  await connectionToDatabase();
  try {
    const todaysDate = new Date().toISOString().split("T")[0];
    const expiryDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
    console.log(expiryDate, "Expiry Date ----------------------");
    const totalDonors = await RequestModel.countDocuments({status:false});
    const totalAppointments = await Appointment.countDocuments({ date: todaysDate, completed:false });
    const totalUnitsAvailable = await blood.countDocuments({
      date: { $gte: expiryDate }
    });

    return NextResponse.json({
      totalDonors,
      totalAppointments,
      totalUnitsAvailable
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
