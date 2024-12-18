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
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post(
  '/',
  upload.single('photo'),
  jsonParser,
  validateBody(contactsSchema),
  ctrlWrapper(postContact),
);
router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(replaceContactsSchema),
  ctrlWrapper(updateContactId),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactId));

export default router;
