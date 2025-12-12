import { sequelize, Cart, CartItem, Product, Order, OrderItem, User, WalletTransaction } from "../models/index.js"

export const createOrderWithStockDeduction = async (userId, useWallet, paymentMethod) => {
    return await sequelize.transaction(async (t) => {
        const cart = await Cart.findOne({ where: { user_id: userId }, include: [{ model: Product }], transaction: t })
        if (!cart) throw new Error("cart is empty")
        const items = await CartItem.findAll({ where: { cart_id: cart.id }, include: [{ model: Product }], transaction: t })
        if (!items.length) throw new Error("cart is empty")
        let total = 0;
        items.forEach(i => {
            total += parseFloat(i.unit_price) * i.quantity;
        });

        let walletUsed = 0;
        const user = await User.findByPk(userId, { transaction: t })
        if (walletUsed) {
            walletUsed = Math.min(user.wallet_points, total)
            total -= walletUsed
            user.wallet_points -= walletUsed
            await user.save({ transaction: t })
            if (walletUsed > 0) {
                await WalletTransaction.create({ user_id: userId, type: 'DEBIT', points: walletUsed, reason: 'ORDER_PAYMENT' }, { transaction: t })
            }
        }
        for (const item of items) {
            if (item.Product.stock < item.quantity) throw new Error('insufficient stock for' + item.Product.name)
            item.Product.stock -= item.quantity
            await item.Product.save({ transaction: t })
        }
        const order = await Order.create({
            user_id: userId,
            total_amount: total,
            wallet_points_used: walletUsed,
            payment_status: 'PENDING',
            status: "PLACED"
        }, { transaction: t })
        for (const item of items) {
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price
            }, { transaction: t })
        }
        await CartItem.destroy({
            where: {
                cart_id: cart.id
            }, transaction: t
        })
        return order
    })
}