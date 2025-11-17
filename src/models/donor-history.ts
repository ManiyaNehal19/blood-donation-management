import mongoose from "mongoose";

const donorHistorySchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true
  },
  historyDate: {
    type: Date,
    required: true
  },
  bloodVolume: {
    type: Number,
    required: true
  },
  unitId: {
    type: String,
    required: true,
    unique: true
  }
});

const DonorHistory = mongoose.models.donor_histories || mongoose.model("donor_histories", donorHistorySchema);
export default DonorHistory;
