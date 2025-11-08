import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  prescriptions: {
    type: [String],
    default: []
  },
  allergies: {
    type: [String],
    default: []
  },
  diseases: {
    type: [String],
    default: []
  }
});
const MedicalHistory = mongoose.models.MedicalHistory || mongoose.model("MedicalHistory", medicalHistorySchema);
export default MedicalHistory;
