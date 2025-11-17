import connectionToDatabase from "@/lib/mongoose";
import staff from "@/models/staff";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    await connectionToDatabase();
    const { email, password, cnic } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log(email, password, "Staff login API route------------------");

    const existingStaff = await staff.findOne({ email, password, CNIC:cnic });

    if (existingStaff) {
      return NextResponse.json(
        { message: "Login successful", staff: existingStaff },
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
    console.error("Error checking staff credentials:", error);
  }
}
