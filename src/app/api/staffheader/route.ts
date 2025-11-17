import connectionToDatabase from "@/lib/mongoose";
import Appointment from "@/models/appoint";
import blood from "@/models/blood";
import Donor from "@/models/donor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const todaysDate = new Date().toISOString().split("T")[0];
    const expiryDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
    console.log(expiryDate, "Expiry Date ----------------------");
    const totalDonors = await Donor.countDocuments();
    const totalAppointments = await Appointment.countDocuments({ date: todaysDate });
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
