import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import { getValueEnv } from "../helpers/getValueEnv.js";

const avatarsPath = path.resolve("public", "avatars");

export async function register(body) {
  const user = await User.findOne({ email: body.email });
  if (user) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(body.password, 10);

  const avatarURL = gravatar.url(
    { email: body.email },
    { s: "250", d: "identicon" },
    false
  );

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...body,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  return newUser;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, getValueEnv("SECRET_KEY"), {
    expiresIn: "23h",
  });
  const { subscription, avatarURL } = await User.findOneAndUpdate(
    { _id: user._id },
    { token }
  );

  return { token, email, subscription, avatarURL };
}

export async function logout({ _id }) {
  await User.findOneAndUpdate({ _id }, { token: "" });

  return;
}

export async function updateAvatar({ _id, file }) {
  if (!file) {
    throw HttpError(400, "File not found");
  }

  const { path: oldPath, originalname, mimetype } = file;
  if (
    !["image/bmp", "image/jpeg", "image/png", "image/jpg"].includes(mimetype)
  ) {
    throw HttpError(400, "Unsupported file type");
  }

  const filename = `${_id}_${Date.now()}_${originalname}`;
  const newPath = path.join(avatarsPath, filename);
  const avatar = await Jimp.read(oldPath);
  avatar.resize(250, 250).write(newPath);
  fs.unlink(oldPath);
  const newAvatarURL = path.resolve("avatars", filename);
  const { avatarURL } = await User.findOneAndUpdate(
    { _id },
    { avatarURL: newAvatarURL },
    {
      new: true,
    }
  );

  return avatarURL;
}

export async function verifyEmail(verificationToken) {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return;
}

export async function resendVerifyEmail({ email }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { verify, verificationToken } = user;
  if (verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  return { verificationToken };
}
