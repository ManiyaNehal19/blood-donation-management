import connectionToDatabase from "@/lib/mongoose";
import hospital from "@/models/hospital";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectionToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    console.log(email, password, "API route------------------");
    
    const existingHospital = await hospital.findOne({ email, password });
    if (existingHospital) {
      return NextResponse.json(
        { message: "Login successful", hospital: existingHospital },
        { status: 200 }
      );
    } else {
      console.error("Invalid email or password");
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error checking hospital credentials:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
