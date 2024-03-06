import mongoose from "mongoose";

export const ConnectDB = async()=>{
    const url = process.env.MONGO_URL;
    const connect = await mongoose.connect(url);
    console.log("database connected");
}

export default ConnectDB;