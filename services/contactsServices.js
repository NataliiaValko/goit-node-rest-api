import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

export async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find(({ id }) => contactId === id);

  return contact || null;
}

export async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => contactId === id);
  if (index === -1) return null;

  const removedContact = allContacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removedContact;
}

export async function addContact({ name, email, phone }) {
  const newContact = { name, email, phone, id: nanoid() };
  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

export async function updateContactById(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
