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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsCtrl);

contactsRouter.get("/:id", isValidId, getOneContactCtrl);

contactsRouter.delete("/:id", isValidId, deleteContactCtrl);

contactsRouter.post("/", validateBody(createContactSchema), createContactCtrl);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  updateContactCtrl
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateStatusFavoriteSchema),
  updateStatusContactCtrl
);

export default contactsRouter;
