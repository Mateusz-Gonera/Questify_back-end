import Joi from "joi";

const userSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(100).regex(/^[a-zA-Z0-9]*$/).required(),
	token: Joi.string(),
});

const validator = (schema) => (body) => {
	return schema.validate(body, { abortEarly: false });
};

export const userValidate = validator(userSchema);
