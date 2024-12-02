import createHttpError from 'http-errors';
import {
  getContacts,
  createContacts,
  deleteContacts,
  updateContacts,
  getContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getAllContacts(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filters = parseFilterParams(req.query);
  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const contact = await getContact(contactId);
  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function postContact(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email || '',
    isFavorite: req.body.isFavorite || false,
    contactType: req.body.contactType,
  };

  const result = await createContacts(contact);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: result,
  });
}

export async function updateContactId(req, res) {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavorite: req.body.isFavorite,
    contactType: req.body.contactType,
  };

  const result = await updateContacts(contactId, contact);

  if (!result) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
}

export async function deleteContactId(req, res) {
  const { contactId } = req.params;
  const result = await deleteContacts(contactId);
  if (!result) {
    throw createHttpError.NotFound('Contact not found');
  }
  res.status(204).send();
}
