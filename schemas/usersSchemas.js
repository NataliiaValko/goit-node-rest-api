import Joi from "joi";

export const authenticateUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().required(),
});
