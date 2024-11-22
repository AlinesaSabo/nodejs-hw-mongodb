import express from 'express';
import {
  deleteContactId,
  getAllContacts,
  getContactById,
  postContact,
  updateContactId,
} from '../contollers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
router.post('/contacts', jsonParser, ctrlWrapper(postContact));
router.patch('/contacts/:contactId', jsonParser, ctrlWrapper(updateContactId));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactId));

export default router;
