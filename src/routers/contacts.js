import express from 'express';
import {
  deleteContactId,
  getAllContacts,
  getContactById,
  postContact,
  updateContactId,
} from '../contollers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsSchema,
  replaceContactsSchema,
} from '../validation/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactById));
router.post(
  '/contacts',
  jsonParser,
  validateBody(contactsSchema),
  ctrlWrapper(postContact),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  jsonParser,
  validateBody(replaceContactsSchema),
  ctrlWrapper(updateContactId),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactId));

export default router;
