import Joi from "joi"

export const placeOrderSchema = Joi.object({
    user_wallet: Joi.boolean().default(false),
    payment_method: Joi.string().required()
})