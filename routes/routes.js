import express from "express";
import authController from "../controllers/authController.js";
import menuController from "../controllers/menuController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();



router.post("/login" , authController().login);
router.post("/register" , authController().register);
router.post("/logout" , authController().logout);
router.post("/get/user" , authController().getUserById);

router.post("/upload/item" , menuController().addItemInMenu);
router.get("/get/menu" , menuController().getAllMenuItems);
router.post("/delete/menu/item" , menuController().deleteMenuById);

router.post("/add/cart" , cartController().addToCart);
router.post("/get/cart" , cartController().getCartById);
router.post("/delete/cart/item" , cartController().deleteCartItemById);
router.post("/clear/cart" , cartController().emptyCart);

router.post("/order/place" , orderController().placeOrder);
router.post("/order/get" , orderController().getOrdersById);
router.post("/order/get/:orderId" , orderController().getSingleOrder);
router.post("/admin/all/orders" , orderController().getAllOrders);
router.post("/update/status" , orderController().updateStatus);

export default router;