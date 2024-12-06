import express from 'express';
import {
  deleteContactId,
  getAllContacts,
  getContactById,
  postContact,
  updateContactId,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsSchema,
  replaceContactsSchema,
} from '../validation/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post(
  '/',
  jsonParser,
  validateBody(contactsSchema),
  ctrlWrapper(postContact),
);
router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(replaceContactsSchema),
  ctrlWrapper(updateContactId),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactId));

export default router;
