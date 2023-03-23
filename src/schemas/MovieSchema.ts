import Joi from "joi";

const createMovieSchema = Joi.object({
    title: Joi.string().required(),
    poster: Joi.string().uri().required()
});

const updateMovieSchema = Joi.object({
    title: Joi.string(),
    poster: Joi.string()
});

export { createMovieSchema, updateMovieSchema };