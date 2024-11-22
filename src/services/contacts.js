import { Contact } from '../models/contacts.js';

export function getContacts() {
  return Contact.find();
}

export function getContact(contactsId) {
  return Contact.findById(contactsId);
}

export function createContacts(contacts) {
  return Contact.create(contacts);
}

export function updateContacts(contactsId, contacts) {
  return Contact.findByIdAndUpdate(contactsId, contacts, { new: true });
}

export function deleteContacts(contactsId) {
  return Contact.findByIdAndDelete(contactsId);
}
