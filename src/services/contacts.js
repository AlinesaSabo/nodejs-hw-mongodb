import { Contact } from '../models/contacts.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filters,
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find({ userId });

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

export function getContact(contactsId, userId) {
  return Contact.findOne({ _id: contactsId, userId });
}

export function createContacts(contacts) {
  return Contact.create(contacts);
}

export async function updateContacts(contactsId, contacts) {
  const contact = await Contact.findById(contactsId);
  if (!contact) {
    throw new Error('Contact not found');
  }

  return Contact.findByIdAndUpdate(contactsId, contacts, {
    new: true,
  });
}

export async function deleteContacts(contactsId) {
  const contact = await Contact.findById(contactsId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return Contact.findByIdAndDelete(contactsId);
}
