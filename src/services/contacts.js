import { Contact } from '../models/contacts.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filters,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filters.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  if (filters.contactType) {
    contactQuery.where('contactType').equals(filters.contactType);
  }

  const [total, data] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
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
