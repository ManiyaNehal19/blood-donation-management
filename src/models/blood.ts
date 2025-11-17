import mongoose from "mongoose";

const BloodSchema = new mongoose.Schema(
  {
    unitId: {
      type: String,
      required: true,
      unique: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    date: {
      type: Date,
      required: true,
    },
  },
);

export default mongoose.models.Blood || mongoose.model("Blood", BloodSchema);
