import { Contact } from "../models/contact.js";

export async function listContacts({ owner }) {
  const allContacts = await Contact.find({ owner });
  return allContacts;
}

export async function getContactById({ _id, owner }) {
  const contact = Contact.findOne({ _id, owner });
  return contact;
}

export async function removeContact({ _id, owner }) {
  const result = await Contact.findOneAndDelete({ _id, owner });
  return result;
}

export async function addContact({ body, owner }) {
  const result = await Contact.create({ ...body, owner });
  return result;
}

export async function updateContactById({ _id, body, owner }) {
  const result = await Contact.findOneAndUpdate({ _id, owner }, body, {
    new: true,
  });
  return result;
}

export async function updateStatusContactById({ _id, body, owner }) {
  const result = await Contact.findOneAndUpdate({ _id, owner }, body, {
    new: true,
  });
  return result;
}
