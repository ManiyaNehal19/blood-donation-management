import mongoose from "mongoose";
const connectionToDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.MongoUrl as string);
    } catch (error) {
        console.log(error);
        
    }
}
export default connectionToDatabase;