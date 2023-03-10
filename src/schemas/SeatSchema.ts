import Joi from 'joi';

const createSeatSchema = Joi.object({
    sessionid: Joi.number().required(),
    rowseats: Joi.number().required(),
    columnseats: Joi.number().required(),
    status: Joi.string().required(),
    seatid: Joi.number().required(),
});

const updateSeatSchema = Joi.object({
    sessionid: Joi.number(),
    rowseats: Joi.number(),
    columnseats: Joi.number(),
    status: Joi.string(),
    seatid: Joi.number(),
});

export { createSeatSchema, updateSeatSchema };