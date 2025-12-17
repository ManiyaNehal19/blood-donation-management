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
    
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); 

    const totalDonations = donations.length;
    const latestDonation = donations[0];
    
    let latestDate = null;
    let nextEligibleDate = today;
    let eligibilityStatus = "Eligible"; 

   if (latestDonation) {
      latestDate = new Date(latestDonation.historyDate);
      
      const calculatedDate = new Date(latestDate);
      calculatedDate.setDate(calculatedDate.getDate() + 90);
      if (calculatedDate <= today) {
        nextEligibleDate = today;
        eligibilityStatus = "Eligible";
      } else {
        nextEligibleDate = calculatedDate;
        eligibilityStatus = "Not Eligible";
      }
    }

    return NextResponse.json(
      {
        bloodGroup: user?.bloodGroup ?? "Not found",
        totalDonations: totalDonations ?? 0,
        nextEligibleDate: nextEligibleDate.toISOString().split("T")[0],
        eligibilityStatus: eligibilityStatus
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Eligibility Calculation Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
