import express from 'express'
import { paymentCallback } from "../controllers/payments.controller.js"
import validate from "../middlewares/validate.middleware.js"
import { paymentCallbackSchema } from "../validations/payment.validation.js"

const router = express.Router()

router.post("/callback", validate(paymentCallbackSchema), paymentCallback)

export default router;