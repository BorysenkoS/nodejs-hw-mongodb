import express from 'express';
import {
  getContactByIDController,
  getContactsController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactByIDController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.patch('/:id', jsonParser, ctrlWrapper(patchContactController));

export default router;
