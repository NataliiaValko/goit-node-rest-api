import {
  login,
  register,
  logout,
  updateAvatar,
} from "../services/usersServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const registerUser = async (req, res) => {
  const { email, subscription, avatarURL } = await register(req.body);

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

export const registerUserCtrl = ctrlWrapper(registerUser);
export const loginUserCtrl = ctrlWrapper(loginUser);
export const logoutUserCtrl = ctrlWrapper(logoutUser);
export const currentUserCtrl = ctrlWrapper(currentUser);
export const updateAvatarUserCtrl = ctrlWrapper(updateAvatarUser);
