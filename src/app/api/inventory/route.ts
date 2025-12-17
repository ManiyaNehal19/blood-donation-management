import connectionToDatabase from "@/lib/mongoose"; 
import blood from "@/models/blood";
import { NextResponse } from "next/server";
import Eligible from "@/models/eligibility";
import Donor from "@/models/donor";
export async function GET(request: Request) {
  await connectionToDatabase();

  try {
    const expiryDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);

    const bloodTypes = ["A+", "B+", "A-", "O+", "AB+", "O-", "AB-", "B-"];
    const result: Record<string, number> = {};
    for (const type of bloodTypes) {
      const data = await blood.find(
        { type, date: { $gte: expiryDate }, left: { $gt: 0 } },
        { _id: 0, left: 1 }
      );
      const totalLeft = data.reduce((sum, item) => sum + item.left, 0);
      result[type] = totalLeft;
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// export async function POST(request:Request) {
//   connectionToDatabase();
//   try{
//     const Id = await blood.countDocuments({}) + 1;
//     const unitId = `UNIT-${Id}`
//     const {volume, cnic} = await request.json();
//     const parsedDate = Date.now();
//     const get_bloodType = await Donor.find({cnic:cnic},{bloodGroup:1, _id:0});
//     console.log(get_bloodType);
//     const newBlood = blood.insertOne({unitId, volume, type:get_bloodType.bloodGroup, date:parsedDate, left: volume});
//     const updateEligible = await Eligible.findOneAndUpdate({ donorCnic: cnic },{completed:true},{ new: true, sort: { date: -1 } }
// );

//     return NextResponse.json({message:"updated Inventory"}, {status:201});
//   }catch{

//   }
  
// }
export async function POST(request: Request) {
  await connectionToDatabase();
  try {
    const { volume, cnic } = await request.json();
    const Id = await blood.countDocuments({}) + 1;
    const unitId = `UNIT-${Id}`;
    const donor = await Donor.findOne({ cnic: cnic }, { bloodGroup: 1, _id: 0 });

    if (!donor) {
      return NextResponse.json({ message: "Donor not found" }, { status: 404 });
    }

    const bloodType = donor.bloodGroup; 
    const parsedDate = new Date();

    await blood.create({
      unitId,
      volume,
      type: bloodType, 
      date: parsedDate,
      left: volume
    });

    await Eligible.findOneAndUpdate(
      { donorCnic: cnic },
      { completed: true },
      { new: true, sort: { date: -1 } }
    );

    return NextResponse.json({ message: "Updated Inventory" }, { status: 201 });
  } catch (error: any) {
    console.error("Error in API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}