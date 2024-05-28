import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContactById,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!Object.keys(body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await updateContactById(id, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const result = await updateStatusContactById(id, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export const getAllContactsCtrl = ctrlWrapper(getAllContacts);
export const getOneContactCtrl = ctrlWrapper(getOneContact);
export const deleteContactCtrl = ctrlWrapper(deleteContact);
export const createContactCtrl = ctrlWrapper(createContact);
export const updateContactCtrl = ctrlWrapper(updateContact);
export const updateStatusContactCtrl = ctrlWrapper(updateStatusContact);
