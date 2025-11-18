import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  hospId: string;
  requests: {
    "A+": number;
    "A-": number;
    "B+": number;
    "B-": number;
    "AB+": number;
    "AB-": number;
    "O+": number;
    "O-": number;
  };
  date: Date;
}

const RequestSchema: Schema = new Schema(
    {
      id: {
      type: String, 
      required: true,
    },
    hospId: {
      type: String,
      required: true,
    },

    requests: {
      "A+": { type: Number, default: 0 },
      "A-": { type: Number, default: 0 },
      "B+": { type: Number, default: 0 },
      "B-": { type: Number, default: 0 },
      "AB+": { type: Number, default: 0 },
      "AB-": { type: Number, default: 0 },
      "O+": { type: Number, default: 0 },
      "O-": { type: Number, default: 0 },
    },

    date: {
      type: Date,
      default: () => new Date().setUTCHours(0, 0, 0, 0),
    },
    status: {type: Boolean, required: true, default: false}
  }
);

const RequestModel =
  mongoose.models.Request || mongoose.model<IRequest>("Request", RequestSchema);

export default RequestModel;
