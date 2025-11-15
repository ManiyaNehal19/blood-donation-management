import connectionToDatabase from "@/lib/mongoose";
import MedicalHistory from "@/models/medical-history";
import { NextResponse } from "next/server";

export async function POST(request:Request){
  try {
    await connectionToDatabase();

    const { cnic, prescriptions, allergies, diseases } = await request.json();

    const newHistory = new MedicalHistory({
      cnic,
      prescriptions: prescriptions ? prescriptions.split(",").map(x=> x.trim()) : [],
      allergies: allergies ? allergies.split(",").map(x => x.trim()) : [],
      diseases: diseases ? diseases.split(",").map(x => x.trim()) : []
    });

    await newHistory.save();

    return NextResponse.json({ message: "History registered" }, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to register history", error: error }, { status: 500 });
  }
}
export async function GET(request:Request){
  await connectionToDatabase();
  try{
   
    const {searchParams} = new URL(request.url);
    const cnic = searchParams.get("cnic");
    const MedicHistory = await MedicalHistory.findOne({cnic});
    console.log(MedicHistory);
    return NextResponse.json({message: MedicHistory}, {status:201});
  }catch(error){
    console.log(error);
  }
}