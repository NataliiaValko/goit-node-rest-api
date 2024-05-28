import { login, register, logout } from "../services/usersServices.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const registerUser = async (req, res) => {
  const { email, subscription } = await register(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const token = await login(req.body);

  res.json({
    token,
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await logout({ _id });

  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const registerUserCtrl = ctrlWrapper(registerUser);
export const loginUserCtrl = ctrlWrapper(loginUser);
export const logoutUserCtrl = ctrlWrapper(logoutUser);
export const currentUserCtrl = ctrlWrapper(currentUser);
