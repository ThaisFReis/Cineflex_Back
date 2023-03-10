import Joi from 'joi';

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export { createUserSchema, updateUserSchema, loginSchema };