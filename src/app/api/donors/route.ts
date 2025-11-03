import connectionToDatabase from "@/lib/mongoose";
import Donor from "@/models/donor";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    await connectionToDatabase();
    const { firstName,lastName,dob,gender,contact,cnic, email, city, bloodGroup, password} = await request.json();
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
  } catch (error) {
    console.error("Error registering donor:", error);
    // return NextResponse.json(
    //   { message: "Server error", error: error.message },
    //   { status: 500 }
    // );
  }
}
