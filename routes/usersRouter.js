import express from "express";

import validateBody from "../helpers/validateBody.js";
import {
  authenticateUserSchema,
  emailSchema,
} from "../schemas/usersSchemas.js";
import {
  registerUserCtrl,
  loginUserCtrl,
  currentUserCtrl,
  logoutUserCtrl,
  updateAvatarUserCtrl,
  verifyEmailUserCtrl,
  resendVerifyEmailUserCtrl,
} from "../controllers/usersControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(authenticateUserSchema),
  registerUserCtrl
);

usersRouter.get("/verify/:verificationToken", verifyEmailUserCtrl);
usersRouter.post(
  "/verify",
  validateBody(emailSchema),
  resendVerifyEmailUserCtrl
);
usersRouter.post("/login", validateBody(authenticateUserSchema), loginUserCtrl);

usersRouter.post("/logout", authenticate, logoutUserCtrl);
usersRouter.get("/current", authenticate, currentUserCtrl);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarUserCtrl
);

export default usersRouter;
