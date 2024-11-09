import express from 'express';
import {
  getContactByIDController,
  getContactsController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactByIDController));

router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(updateContactSchema),
);

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:id',
  jsonParser,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
