import connectionToDatabase from "@/lib/mongoose";
import DonorHistory from "@/models/donor-history";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  await connectionToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const cnic = searchParams.get("cnic");
    console.log(cnic, "get cnic ----------------");
    const user = await DonorHistory.find({cnic});
    console.log("user in get -----------", user);

    return NextResponse.json({user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectionToDatabase();

  try {
    const {cnic} = await request.json();
  
    const user = await DonorHistory.find({cnic});
    console.log("user in get -----------", user);

    return NextResponse.json({user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
