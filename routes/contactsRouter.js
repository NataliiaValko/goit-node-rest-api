import express from "express";

import {
  getAllContactsCtrl,
  getOneContactCtrl,
  deleteContactCtrl,
  createContactCtrl,
  updateContactCtrl,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../helpers/isValidId.js";
import { checkEmptyBody } from "../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsCtrl);

contactsRouter.get("/:id", isValidId, getOneContactCtrl);

contactsRouter.delete("/:id", isValidId, deleteContactCtrl);

contactsRouter.post("/", validateBody(createContactSchema), createContactCtrl);

contactsRouter.put(
  "/:id",
  checkEmptyBody,
  isValidId,
  validateBody(updateContactSchema),
  updateContactCtrl
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateStatusFavoriteSchema),
  updateContactCtrl
);

export default contactsRouter;
