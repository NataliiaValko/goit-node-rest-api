import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import { getValueEnv } from "../helpers/getValueEnv.js";

export const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      next(HttpError(401, "Not authorized"));
    }

    const { id } = jwt.verify(token, getValueEnv("SECRET_KEY"));
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};
