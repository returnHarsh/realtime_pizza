import mongoose, { Schema } from "mongoose";

const cartModel = mongoose.Schema({
    userId : {type : Schema.Types.ObjectId , ref : "User"},
    image : {type : String},
    itemName : {type : String},
    itemPrice : {type : Number},
} , {timestamps : true} )

const Cart = mongoose.model("cart" , cartModel);

export default Cart;
