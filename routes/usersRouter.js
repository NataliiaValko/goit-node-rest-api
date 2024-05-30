import express from "express";

import validateBody from "../helpers/validateBody.js";
import { authenticateUserSchema } from "../schemas/usersSchemas.js";
import {
  registerUserCtrl,
  loginUserCtrl,
  currentUserCtrl,
  logoutUserCtrl,
  updateAvatarUserCtrl,
} from "../controllers/usersControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(authenticateUserSchema),
  registerUserCtrl
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
