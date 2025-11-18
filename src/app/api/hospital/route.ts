import connectionToDatabase from "@/lib/mongoose";
import hospital from "@/models/hospital";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
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
        { message: "Login successful", hospital: existingHospital, id:existingHospital.hospId},
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
   
  }
}
export async function GET(request:Request) {
  await connectionToDatabase();
  try {
    const {searchParams} = new URL(request.url);
    const hospId = searchParams.get("id");
    console.log(hospId, "+++++++++++++++")
    const getHospitalnfo = await hospital.findOne({hospId: hospId}, {_id:0, email:0, password:0});
    console.log(getHospitalnfo, "____________________________");
    return NextResponse.json({getHospitalnfo}, {status:201});
  } catch (error) {
    console.log(error);
  }
}
