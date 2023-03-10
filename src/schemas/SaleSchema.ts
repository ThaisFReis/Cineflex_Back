import Joi from 'joi';

const SaleSchema = Joi.object({
    id: Joi.number().integer().required(),
    sessionid: Joi.number().integer().required(),
    seatid: Joi.number().integer().required(),
    userid: Joi.number().integer().required(),
    price: Joi.number().required(),
    tickettype: Joi.string().required(),
    documenttype: Joi.string(),
    documentnumber: Joi.string(),
    seat: Joi.object(),
    session: Joi.object(),
    User: Joi.object()
});

const createSaleSchema = Joi.object({
    sessionid: Joi.number().integer().required(),
    seatid: Joi.number().integer().required(),
    userid: Joi.number().integer().required(),
    price: Joi.number().required(),
    tickettype: Joi.string().required(),
    documenttype: Joi.string(),
    documentnumber: Joi.string(),
});

const updateSaleSchema = Joi.object({
    sessionid: Joi.number().integer(),
    seatid: Joi.number().integer(),
    userid: Joi.number().integer(),
    price: Joi.number(),
    tickettype: Joi.string(),
    documenttype: Joi.string(),
    documentnumber: Joi.string()
});

export { SaleSchema, createSaleSchema, updateSaleSchema };