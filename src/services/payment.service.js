import { sequelize, Order, OrderItem, Product } from "../models/index.js"

export const updatePaymentStatus = async (orderId, status, reference) => {
    return await sequelize.transactin(async (t) => {
        const order = await Order.findByPk(orderId, { include: [{ model: OrderItem, as: 'items' }], transactin: t })
        if (!order) throw new Error("Order not found")
        if (status === 'FAILED') {
            for (const item of order.items) {
                const product = await Product.findByPk(item.product_id, { transactin: t })
                product.stock += item.quantity
                await product.save({ transactin: t })
            }
            order.payment_status = 'FAILED'
            order.status = 'CANCELLED';
            await order.save({ transactin: t })
        }
        if (status === "SUCCESS") {
            order.payment_status = 'SUCCESS';
            order.status = 'COMPLETED'
            await order.save({ transactin: t })
        }
        return order;
    })
}