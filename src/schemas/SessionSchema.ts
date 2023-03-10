import Joi from 'joi';

const createSessionSchema = Joi.object({
    movie_id: Joi.number().integer().required(),
    room_id: Joi.number().integer().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
});

const updateSessionSchema = Joi.object({
    movie_id: Joi.number().integer(),
    room_id: Joi.number().integer(),
    date: Joi.date(),
    time: Joi.string(),
});

export { createSessionSchema, updateSessionSchema };