import connectionToDatabase from "@/lib/mongoose";
import Donor from "@/models/donor";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    await connectionToDatabase();
    const { firstName,lastName,dob,gender,contact,cnic, email, city, bloodGroup, password} = await request.json();
    
    if(firstName && lastName && dob && gender && contact && cnic &&  email &&  city &&  bloodGroup &&  password){
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
    }else{
      const loginDonor = await Donor.findOne({email, password, cnic});
      console.log("In else block", cnic);
      
      return NextResponse.json(
      { message: "Donor found successfully", donor: loginDonor },
      { status: 201 }
    );
    }
    
  } catch (error) {
    console.error("Error registering donor:", error);
  
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
