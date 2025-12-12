import express from "express"
import { register, login } from "../controllers/auth.controller.js"
import validate from "../middlewares/validate.middleware.js"
import { registerSchema, loginShcema } from "../validations/auth.validation.js"

const router = express.Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginShcema), login)

export default router;