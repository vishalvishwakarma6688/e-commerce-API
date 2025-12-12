import Joi from "joi"

export const paymentCallbackSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    status: Joi.string().valid('SUCCESS', 'FAILED').required(),
    transaction_reference: Joi.string().allow(null, '')
})