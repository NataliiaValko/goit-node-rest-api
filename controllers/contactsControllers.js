import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const owner = req.user._id;
  const result = await listContacts({ owner });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;
  const result = await getContactById({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;
  const result = await removeContact({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const owner = req.user._id;
  const body = req.body;
  const result = await addContact({ body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const body = req.body;
  const owner = req.user._id;

  const result = await updateContactById({ _id, body, owner });
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
