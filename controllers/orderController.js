import Order from "../models/orderModel.js";

const orderController = () =>{

    return{
        placeOrder : async(req,res)=>{
            const {userId , cart} = req.body;

            const newOrder = new Order({
                userId , cart
            })
            await newOrder.save();
            return res.json({success : "order placed"});
        },
        getOrdersById : async(req,res)=>{
            const {userId} = req.body;
            const orders = await Order.find({userId}).sort({ createdAt : -1 });
            return res.json({success : "order fetched successfully" , orders});
        },

        getSingleOrder : async(req,res)=>{
            const {orderId} = req.params;
            const order = await Order.findById(orderId);
            return res.json({success : "order fetched" , order});
        },
        getAllOrders : async(req,res)=>{
            const allOrders = await Order.find({}).sort({createdAt : -1});
            return res.json({success : "all orders fetched" , orders :  allOrders});
        },
        updateStatus : async(req,res)=>{
            const {orderId , value} = req.body;
            await Order.findOneAndUpdate({_id : orderId} , {status : value});
            return res.json({success : "status updated"});
        },

    }



}

export default orderController