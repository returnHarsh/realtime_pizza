import User from "../models/userModel.js";
import generateCookie from "../utils/generateCookie.js";
import bcrypt, { hash } from "bcrypt";

const authController = ()=>{

    return{
        login : async(req,res)=>{
            try{

                const {email , password} = req.body;

                const isUserExsists = await User.findOne({email});
                if(isUserExsists){
                  const  isPasswordMatch = await bcrypt.compare(password , isUserExsists.password);
                    if(isPasswordMatch){
                        await generateCookie(isUserExsists._id , res);
                    return res.json({success : "user logged in" , user : isUserExsists});
                    }
                    return res.json({error : "password is incorrect"});
                }
                else return res.json({error : "user not found"});
                
            }catch(error){
                console.log(error);
                return res.json({error});
            }
        },

        register : async(req,res)=>{

            const {name , email , phone , password ,  address} = req.body;

            try{
                const isUserExsists = await User.findOne({email});

                if(isUserExsists){
                    return res.json({error : "user already exsists"});
                }
                else{

                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password , salt);

                    let user = new User({
                        name , email , address , phone , password : hashPassword,
                    })
                    await user.save();
                    await generateCookie(user._id , res);
                    return res.json({success : "user registered successfully" , user})
                }

            }catch(error){
                console.log(error);
                return res.json({error : error});
            }

        },
        logout : async(req,res)=>{
            res.clearCookie("user");
            return res.json({success : "logged out successfully"});
        },

        getUserById : async(req,res)=>{
            const {userId} = req.body;
            const user = await User.findById(userId);
            return res.json({success : "user fetched" , user});
        }

    }
}

export default authController;