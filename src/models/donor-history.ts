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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    required: true
  }
}, { timestamps: true });

const DonorHistory = mongoose.models.DoonorHistory || mongoose.model("DoonorHistory", donorHistorySchema);
export default DonorHistory;
