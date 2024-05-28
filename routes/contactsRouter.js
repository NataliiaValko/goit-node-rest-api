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
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsCtrl);

contactsRouter.get("/:id", getOneContactCtrl);

contactsRouter.delete("/:id", deleteContactCtrl);

contactsRouter.post("/", validateBody(createContactSchema), createContactCtrl);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  updateContactCtrl
);

export default contactsRouter;
