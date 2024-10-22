import express from 'express';
import {
  getContactByIDController,
  getContactsController,
  createContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactByIDController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.put('/:id');

export default router;
