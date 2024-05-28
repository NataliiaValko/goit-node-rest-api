import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

import { Contact } from "../models/contact.js";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  const allContacts = await Contact.find();
  return allContacts;
}

export async function getContactById(contactId) {
  const contact = Contact.findOne({ _id: contactId });
  return contact;
}

export async function removeContact(contactId) {
  const result = await Contact.findOneAndDelete({ _id: contactId });
  return result;
}

export async function addContact(newContact) {
  const result = await Contact.create(newContact);
  return result;
}

export async function updateContactById(contactId, body) {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return result;
}

export async function updateStatusContactById(contactId, body) {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return result;
}
