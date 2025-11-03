import mongoose from "mongoose";
const donorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  contact: { type: String, required: true },
  cnic: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format"],
  },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  password: { type: String, required: true },
});

const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);

export default Donor;

