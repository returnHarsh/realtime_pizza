import mongoose from "mongoose";

const userModel = mongoose.Schema({
    name : {type : String},
    email : {type : String},
    address : {type : String},
    role : {type : String , default : "customer"},
    phone : {type : Number},
    password : {type : String},
} , {timestamps : true})

const User = mongoose.model("user" , userModel);

export default User;