import connectionToDatabase from "@/lib/mongoose";
import Donor from "@/models/donor";
import DonorHistory from "@/models/donor-history";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectionToDatabase();

  try {
    const { cnic } = await request.json();
    const user = await Donor.findOne({ cnic });
    const donations = await DonorHistory.find({ cnic }).sort({ historyDate: -1 }); 
    const totalDonations = donations.length;
    const latestDonation = donations[0];
    let latestDate = null;
    let nextEligibleDate = null;
    let eligibilityStatus = "Eligible"; 

    if (latestDonation) {
      latestDate = latestDonation.historyDate;
      nextEligibleDate = new Date(latestDate);
      nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);
      const today = new Date();
      eligibilityStatus = nextEligibleDate <= today ? "Eligible" : "Not Eligible";
    }

    return NextResponse.json(
     {
        bloodGroup: user?.bloodGroup ?? "Not found",
        totalDonations: totalDonations ?? 0,
        nextEligibleDate: nextEligibleDate.toISOString().split("T")[0] || Date.now().toISOString().split("T")[0],
        eligibilityStatus: eligibilityStatus
      },
      { status: 201 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
