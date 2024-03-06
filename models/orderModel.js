import mongoose, { Schema } from "mongoose";

const orderModel = mongoose.Schema({
    userId : {type : Schema.Types.ObjectId , ref : "User"},
    cart : {},
    status : {type : String , default : "placed"},
} , {timestamps : true})

const Order = mongoose.model("order" , orderModel);

export default Order;