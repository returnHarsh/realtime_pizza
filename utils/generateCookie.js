import jwt from "jsonwebtoken";

const  generateCookie = async(id , res)=>{
    const token = jwt.sign({id} , process.env.JWT_SECRET_KEY);
    res.cookie("user" , jwt);
    return token;
}

export default generateCookie