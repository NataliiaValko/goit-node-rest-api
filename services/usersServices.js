import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import { getValueEnv } from "../helpers/getValueEnv.js";

export async function register(body) {
  const user = await User.findOne({ email: body.email });
  if (user) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(body.password, 10);
  const newUser = await User.create({ ...body, password: hashPassword });
  return newUser;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, getValueEnv("SECRET_KEY"), {
    expiresIn: "23h",
  });
  await User.findOneAndUpdate({ _id: user._id }, { token });

  return token;
}

export async function logout({ _id }) {
  await User.findOneAndUpdate({ _id }, { token: "" });

  return;
}
