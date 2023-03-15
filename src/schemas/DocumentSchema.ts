import Joi from "joi";

const DocumentSchema = Joi.object({
    type: Joi.string().required(),
    number: Joi.string().required(),
    verified: Joi.boolean().required(),
});

export default DocumentSchema;