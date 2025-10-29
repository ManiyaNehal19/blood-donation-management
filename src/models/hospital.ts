import mongoose from "mongoose";
const hospitalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hospId: {type: String,  required: true},
    email:{type: String, required:true},
    password:{type:String, required:true}, 
    address:{type:String, required:true},
    phone:{type:Number, required: true}

})
hospitalSchema.index({hospID:1, email:1});
const hospital = mongoose.models.hospital || mongoose.model("hospital", hospitalSchema);
export default hospital;