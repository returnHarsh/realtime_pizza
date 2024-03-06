import mongoose from "mongoose";

const menuModel = mongoose.Schema({
    name : {type : String},
    image : {type : String},
    price : {type : Number},
} , {timestamps : true})

const Menu = mongoose.model("menu" , menuModel);

export default Menu;