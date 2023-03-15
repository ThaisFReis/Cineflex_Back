import Joi from "joi";

const TicketSchema = Joi.object({
    type: Joi.boolean().required(),
    createAt: Joi.date().required(),
});

export default TicketSchema;