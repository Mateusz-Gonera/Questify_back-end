import Joi, { valid } from "joi";

const userSchema = Joi.object({
	email: Joi.string().email(),
	password: Joi.string().regex(/^[a-zA-Z0-9]+$/),
	token: Joi.string(),
});

const validator = (schema) => (body) => {
	return schema.validate(body, { abortEarly: false });
};

export const userValidate = validator(userSchema);
