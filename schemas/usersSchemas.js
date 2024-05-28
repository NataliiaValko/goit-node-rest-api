import Joi from "joi";

export const authenticateUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
