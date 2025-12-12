import { updatePaymentStatus } from "../services/payment.service.js"

export const paymentCallback = async (req, res, next) => {
    try {
        const { order_id, status, transaction_reference } = req.validated
        const updated = await updatePaymentStatus(order_id, status, transaction_reference)
        return res.json({ ok: true, data: updated })
    } catch (error) {
        next(error)
    }
}