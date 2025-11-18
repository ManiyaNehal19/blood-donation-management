import mongoose from "mongoose";

const transfusionSchema = new mongoose.Schema({
  requestId: { type: String, required: true, },
  unfulfilled: {
    "A+": { type: Number, default: 0 },
    "B+": { type: Number, default: 0 },
    "A-": { type: Number, default: 0 },
    "O+": { type: Number, default: 0 },
    "AB+": { type: Number, default: 0 },
    "O-": { type: Number, default: 0 },
    "AB-": { type: Number, default: 0 },
    "B-": { type: Number, default: 0 },
  },
  date: { type: Date, default: Date.now }
});

const Transfusion = mongoose.models.Transfusion || mongoose.model("Transfusion", transfusionSchema);

export default Transfusion;
