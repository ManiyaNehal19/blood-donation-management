import connectionToDatabase from "@/lib/mongoose";
import Donor from "@/models/donor";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
 try {
  await connectionToDatabase();
  const body = await request.json();
  
  if(body.login) {
   const { email, password } = body;

   if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
   }

   const donor = await Donor.findOne({ email });

   if (!donor) {
    return NextResponse.json({ message: "Donor not found with this email" }, { status: 404 });
   }

   if (donor.password !== password) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
   }
   
   return NextResponse.json({ cnic: donor.cnic }, { status: 200 });

  }
    
  const { firstName,lastName,dob,gender,contact,cnic, email, city, bloodGroup, password} = body;
  
  if(firstName && lastName && dob && gender && contact && cnic && email && city && bloodGroup && password){
   const existingDonor = await Donor.findOne({
    $or: [{ email }, { cnic }],
   });

   if (existingDonor) {
    return NextResponse.json({ message: "A donor with this email or CNIC already exists" },{ status: 409 });
   }
   const newDonor = new Donor({ firstName,lastName,dob,gender,contact,cnic, email, city, bloodGroup, password,});
   
   await newDonor.save();

   return NextResponse.json(
    { message: "Donor registered successfully", donor: newDonor },
    { status: 201 }
   );
  }
   
  return NextResponse.json({ message: "Missing required registration fields" }, { status: 400 });

 } catch (error) {
  console.error("Error in POST /api/donors:", error);
  return NextResponse.json({ message: "Server Error during processing" }, { status: 500 });
 }
}


export async function GET(request: Request) {
 await connectionToDatabase();

 try {
  const { searchParams } = new URL(request.url);
  const cnic = searchParams.get("cnic");

  if (!cnic) {
   return NextResponse.json({ error: "CNIC required" }, { status: 400 });
  }

  const user = await Donor.findOne({ cnic });

  return NextResponse.json({ user }, { status: 200 });
 } catch (error) {
  console.log(error);
  return NextResponse.json({ error: "Server Error" }, { status: 500 });
 }
}