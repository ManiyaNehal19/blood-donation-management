import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  donorCnic: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

appointmentSchema.index({ donorCnic: 1, date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
export default Appointment;
