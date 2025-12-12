import { getCartWithItems, getOrCreateCartForUser, removeCartItem, updateCartItemQuantity } from "../services/cart.service.js";

export const addToCart = async (req, res, next) => {
    try {
        const userId = req.userId
        const { product_id, quantity } = req.validated;
        const cart = await getOrCreateCartForUser(userId)
        const item = await addItemToCart(cart.id, product_id, quantity)
        return res.status(201).json({ ok: true, data: item })
    } catch (error) {
        next(error)
    }
}

export const getCart = async (req, res, next) => {
    try {
        const userId = req.userId
        const cart = await getCartWithItems(userId)
        return res.json({ ok: true, data: cart })
    } catch (error) {
        next(error)
    }
}

export const updateCartItem = async (req, res, next) => {
    try {
        const userId = req.userId
        const itemId = req.params.validated
        const { quantity } = req.validated
        const updated = await updateCartItemQuantity(userId, itemId, quantity)
        return res.json({ ok: trye, data: updated })
    } catch (error) {
        next(error)
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.userId
        const itemId = req.params.itemId
        await removeCartItem(userId, itemId)
        return res.json({ ok: true, message: "item removed" })
    } catch (error) {
        next(error)
    }
}