import {
  login,
  register,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../services/usersServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { sendMail } from "../helpers/sendMail.js";
import { getValueEnv } from "../helpers/getValueEnv.js";

const BASE_URL = getValueEnv("BASE_URL");

const registerUser = async (req, res) => {
  const { email, subscription, avatarURL, verificationToken } = await register(
    req.body
  );

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target ="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendMail(verifyEmail);

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

const loginUser = async (req, res) => {
  const { token, email, subscription, avatarURL } = await login(req.body);

  res.json({
    token,
    user: { email, subscription, avatarURL },
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await logout({ _id });

  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    email,
    subscription,
    avatarURL,
  });
};

const updateAvatarUser = async (req, res) => {
  const { _id } = req.user;
  const file = req.file;

  const avatarURL = await updateAvatar({ _id, file });

  res.json({ avatarURL });
};

const verifyEmailUser = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyEmail(verificationToken);

  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmailUser = async (req, res) => {
  const { email } = req.body;

  const { verificationToken } = await resendVerifyEmail({ email });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target ="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendMail(verifyEmail);

  res.json({ message: "Verify email send success" });
};

export const registerUserCtrl = ctrlWrapper(registerUser);
export const loginUserCtrl = ctrlWrapper(loginUser);
export const logoutUserCtrl = ctrlWrapper(logoutUser);
export const currentUserCtrl = ctrlWrapper(currentUser);
export const updateAvatarUserCtrl = ctrlWrapper(updateAvatarUser);
export const verifyEmailUserCtrl = ctrlWrapper(verifyEmailUser);
export const resendVerifyEmailUserCtrl = ctrlWrapper(resendVerifyEmailUser);
