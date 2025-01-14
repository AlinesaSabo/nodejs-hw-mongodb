import * as fs from 'node:fs/promises';
import path from 'node:path';
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
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContact(contactId, userId);

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
  const photoFile = req.file;
  let photo = null;

  if (photoFile) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photo = await saveFileToCloudinary(photoFile);
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'photos', req.file.filename),
      );

      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }
  }
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email || '',
    isFavorite: req.body.isFavorite || false,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo,
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
  const userId = req.user.id;

  const photoFile = req.file;
  let photo;

  if (photoFile) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photo = await saveFileToCloudinary(photoFile);
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'photos', req.file.filename),
      );
      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    photo,
  };

  const result = await updateContacts(contactId, userId, contact);

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
  const userId = req.user.id;
  const result = await deleteContacts(contactId, userId);
  if (!result) {
    throw createHttpError.NotFound('Contact not found');
  }
  res.status(204).send();
}
