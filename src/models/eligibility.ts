import mongoose from "mongoose";
const EligibilitySchema = new mongoose.Schema({
    donorCnic: {type:String, required:true},
    hemoglobin:{type:Number, required:true},
    bloodPressure: {type:Number, required:true},
    weight: {type:Number, required:true},
    date: {type:Date, required:true},
    status:{type:Boolean, required:true},
    completed:{type:Boolean, required:true, default: false},

})

const Eligible = mongoose.models.Eligible|| mongoose.model("Eligible", EligibilitySchema);
export default Eligible;


