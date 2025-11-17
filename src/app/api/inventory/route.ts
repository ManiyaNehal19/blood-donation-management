import connectionToDatabase from "@/lib/mongoose"; 
import blood from "@/models/blood";
import Eligible from "@/models/eligibility";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectionToDatabase();

  try {
    const expiryDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);

    const data1 = await blood.countDocuments({ type: "A+", date: { $gte: expiryDate } });
    const data2 = await blood.countDocuments({ type: "B+", date: { $gte: expiryDate } });
    const data3 = await blood.countDocuments({ type: "A-", date: { $gte: expiryDate } });
    const data4 = await blood.countDocuments({ type: "O+", date: { $gte: expiryDate } });
    const data5 = await blood.countDocuments({ type: "AB+", date: { $gte: expiryDate } });
    const data6 = await blood.countDocuments({ type: "O-", date: { $gte: expiryDate } });
    const data7 = await blood.countDocuments({ type: "AB-", date: { $gte: expiryDate } });
    const data8 = await blood.countDocuments({ type: "B-", date: { $gte: expiryDate } });

    return NextResponse.json({
      "A+": data1,
      "B+": data2,
      "A-": data3,
      "O+": data4,
      "AB+": data5,
      "O-": data6,
      "AB-": data7,
      "B-": data8
    }, {status: 201});

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request:Request) {
  connectionToDatabase();
  try{
    const Id = await blood.countDocuments({}) + 1;
    const unitId = `UNIT-${Id}`
    const {type, volume, date, cnic} = await request.json();
  const parsedDate = Date.now();
   
    const newBlood = blood.insertOne({unitId, volume, type, date});
    const updateEligible = await Eligible.findOneAndUpdate({ donorCnic: cnic },{completed:true},{ new: true, sort: { date: -1 } }
);

    return NextResponse.json({message:"updated Inventory"}, {status:201});
  }catch{

  }
  
}