import { Cart, CartItem, Product } from "../models/index.js"
import { sequelize } from "../config/db.js"

export const getOrCreateCartForUser = async (userId) => {
    let cart = await Cart.findOne({ where: { user_id: userId } })
    if (!cart) cart = await Cart.create({
        user_id: userId
    })
    return cart;
}

export const addItemToCart = async (cartId, productId, quantity) => {
    return await sequelize.transaction(async (t) => {
        const product = await Product.findByPk(productId, { transaction: t });
        if (!product) throw new Error("Product not found")
        if (product.stock < quantity) throw new Error("Insufficient stock")
        let item = await CartItem.findOne({ where: { cart_id: cartId, product_id: productId }, transaction: t })
        if (item) {
            item.quantity += quantity;
            item.unit_price = product.price;
            await item.save({ transaction: t })
        } else {
            item = await CartItem.create({ cart_id: cartId, product_id: productId, quantity, unit_price: product.price }, { transaction: t })
        }
        return item;
    })
}

export const getCartWithItems = async (userId) => {
    const cart = await Cart.findOne({ where: { user_id: userId } })
    if (!cart) return { itms: [], total: 0 }
    const items = await CartItem.findAll({ where: { cart_id: Cart.id }, include: [{ model: Product, as: 'product' }] })
    const structured = items.map(i => ({ id: i.id, product_id: i.product_id, name: i.product?.name || null, quantity: i.quantity, unit_price: i.unit_price, subtotal: parseFloat(i.unit_price) * i.quantity }))
    const total = structured.reduce((s, it) => s + it.subtotal, 0)
    return { id: cart.id, items: structured, total }
}

export const updateCartItemQuantity = async (userId, itemId, quantity) => {
    return await sequelize.transaction(async (t) => {
        const item = await CartItem.findByPk(itemId, { transaction: t })
        if (!item) throw new Error("Cart Item not found");
        const cart = await Cart.findByPk(item.cart_id, { transaction: t })
        if (!cart || cart.user_id !== userId) throw new Error("not authorized")
        const product = await Product.findByPk(item.product_id, { transaction: t })
        if (!product) throw new Error("Product not found")
        if (product.stock < quantity) throw new Error("insufficient stock")
        item.quantity = quantity
        await item.save({ transaction: t })
        return item
    })
}

export const removeCartItem = async (userId, itemId) => {
    const item = await CartItem.findByPk(itemId)
    if (!item) throw new Error("cart item not found")
    const cart = await Cart.findByPk(item.cart_id)
    if (!cart || cart.user_id !== userId) throw new Error("Not authorized")
    await item.destroy()
    return true
}