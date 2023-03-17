import Joi from 'joi';

const PaymentSchema = Joi.object({
    paymentType: Joi.string().required(),
    cardNumber: Joi.number().min(16).max(16).required(),
    cardCvv: Joi.number().min(3).max(4).required(),
    cardDate: Joi.date().required(),
});

export { PaymentSchema };