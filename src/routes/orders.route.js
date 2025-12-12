import express from "express"
import validate from "../middlewares/validate.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { placeOrder } from "../controllers/orders.controller.js"
import { placeOrderSchema } from "../validations/order.validation.js"

const router = express.Router()
router.use(authMiddleware);

router.post("/place", validate(placeOrderSchema), placeOrder)

export default router