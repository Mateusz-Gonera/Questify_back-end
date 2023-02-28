import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string()
    .min(8)
    .max(100)
    .regex(/^[a-zA-Z0-9]*$/)
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),
  accessToken: Joi.string(),
});

const cardSchema = Joi.object({
  title: Joi.string().required().min(2).max(100).messages({
    'string.empty': 'Title is required',
  }),
  difficulty: Joi.string().required().messages({
    'string.empty': 'Choose difficulty of your task',
  }),
  category: Joi.string(),
  date: Joi.date().required().messages({
    'string.empty': 'Choose a date',
  }),
  time: Joi.string(),
  type: Joi.string().required().messages({
    'string.empty': 'Which type of task?',
  }),
  status: Joi.string(),
});

const validator = schema => body => {
  return schema.validate(body, { abortEarly: false });
};

export const userValidate = validator(userSchema);
export const cardValidate = validator(cardSchema);
