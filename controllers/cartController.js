import Cart from "../models/cartModel.js";

const cartController = ()=>{

    return{
        addToCart : async(req,res)=>{
            const {userId , item} = req.body;
            console.log(item);
            const name = item.name;
            const price = item.price;
            const image = item.image;

            const cart = new Cart({
                userId , itemName : name , itemPrice : price , image
            })

            await cart.save();

            return res.json({success : "item added to cart"});

        },
        
        getCartById : async(req,res)=>{
            const {userId} = req.body;

            const cart = await Cart.find({userId});
            return res.json({success : "cart fetched" , cart});
        },

        deleteCartItemById : async(req,res)=>{
            const {cartId} = req.body;
            await Cart.deleteOne({ _id : cartId});

            return res.json({success : "cart deleted successfully"});
        },
        emptyCart : async(req,res)=>{
            const {userId} = req.body;
            await Cart.deleteMany({userId});
            return res.json({success : "cart is being emptied"});
        }

    }

}

export default cartController;