import express from "express";

import {
  getAllContactsCtrl,
  getOneContactCtrl,
  deleteContactCtrl,
  createContactCtrl,
  updateContactCtrl,
  updateStatusContactCtrl,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../helpers/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContactsCtrl);

contactsRouter.get("/:id", authenticate, isValidId, getOneContactCtrl);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContactCtrl);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContactCtrl
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContactCtrl
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateStatusFavoriteSchema),
  updateStatusContactCtrl
);

export default contactsRouter;
