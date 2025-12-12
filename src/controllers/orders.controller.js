import { createOrderWithStockDeduction } from "../services/order.service.js"

export const placeOrder = async (req, res, next) => {
    try {
        const userId = req.userId
        const { use_wallet, payment_method } = req.validated
        const order = await createOrderWithStockDeduction(userId, use_wallet, payment_method)
        return res.status(201).json({ ok: true, data: order })
    } catch (error) {
        next(error)
    }
}