import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import ConnectDB from "./utils/ConnectDB.js";
import {v2 as cloudinary} from "cloudinary";
import path from "path";

dotenv.config();

let __dirname = path.resolve();

const app = express();

app.use(cors({
    origin : "*",
}))

app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY ,
    api_secret : process.env.API_SECRET_KEY,
})


const PORT = process.env.PORT || 8080;

ConnectDB();

app.use("/api" , router);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", function(_, res) {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});



app.listen(PORT , ()=>{
    console.log("server online");
})

