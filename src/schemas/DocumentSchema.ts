import Joi from "joi";

const RGSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().min(9).max(9).required(),
    type: Joi.string().valid("RG").required(),
});

const CPFSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().min(11).max(11).required(),
    type: Joi.string().valid("CPF").required(),
});

export { RGSchema, CPFSchema };