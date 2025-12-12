import express from 'express'
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js"
import validate from "../middlewares/validate.middleware.js"
import authMiddleWares from "../middlewares/auth.middleware.js"
import { addToCartSchema, updateCartItemSchema } from "../validations/cart.validation.js"

const router = express.Router();

router.use(authMiddleWares)

router.post("/add", validate(addToCartSchema), addToCart)
router.get("/", getCart)
router.put("/item/:itemId", validate(updateCartItemSchema), updateCartItem)
router.delete("/item/:itemid", removeFromCart)

export default router