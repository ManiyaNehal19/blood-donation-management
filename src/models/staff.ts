import mongoose from "mongoose";
const staffSchema = new mongoose.Schema({
    name: {type: String, required: true},
    CNIC: {type: String,  required: true},
    email:{type: String, required:true},
    password:{type:String, required:true}, 
    phone:{type:Number, required: true}

})
staffSchema.index({CNIC:1, email:1});
const staff = mongoose.models.staff || mongoose.model("staff", staffSchema);
export default staff;