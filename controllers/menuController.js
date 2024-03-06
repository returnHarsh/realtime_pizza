import Menu from "../models/MenuModel.js"
import {v2 as cloudinary} from "cloudinary";

const menuController =()=>{

    return{
        addItemInMenu : async(req,res)=>{
            const {name  , price} = req.body;
            let {image} = req.body;

            try{

            if(!image){
                return res.json({error : "image is missing"});
            }

            const uploadedResponse = await cloudinary.uploader.upload(image);
                image = uploadedResponse.secure_url;

                const menu = new Menu({
                    name , price , image
                })

                await menu.save();


            return res.json({success : "new item added in menu"});

            }catch(error){
                console.log(error);
                return res.json({error});
            }
            
        },
        getAllMenuItems : async(req,res)=>{
            const menus = await Menu.find({});
            return res.json({success : "fetched menu successfully" , menus});
        },
        deleteMenuById : async(req,res)=>{
            const {id} = req.body;
            await Menu.findOneAndDelete({_id : id});
            return res.json({success : "item deleted successfully"});
        },

    }

}

export default menuController;