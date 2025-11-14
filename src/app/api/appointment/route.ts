import Appointment from "@/models/appoint";
import { NextResponse } from "next/server";
import connectionToDatabase from "@/lib/mongoose";

export async function POST(request: Request) {
  await connectionToDatabase();

  try {
    const { cnic, date, time } = await request.json();

    const res = await Appointment.create({
      donorCnic: cnic,
      date: new Date(date),
      time: time,
    });

    return NextResponse.json({ message: "Appointment created", res });
  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
