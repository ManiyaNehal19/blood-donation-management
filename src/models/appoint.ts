import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  donorCnic: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

export default mongoose.model("Appointment", appointmentSchema);
