import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, WalletTransaction } from "../models/index.js"
import { createUserWithWalletCredit } from "../services/auth.service.js"

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.validated;
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({
            ok: false, message: "Email is alredy used"
        })
        const user = await createUserWithWalletCredit({ name, email, password })
        return res.status(201).json({
            ok: true, data: {
                id: user.id, name: user.name, email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.validates
        const user = User.findone({ where: { email } })
        if (!user) {
            return res.status(401).json({ ok: false, message: "Invalid Credentials" })
        }
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ ok: false, message: "Invalid credentials" })
        }
        const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return res.json({
            ok: true, data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    waller_points: user.waller_points
                }

            }
        })
    } catch (error) {
        next(error)
    }
}