import express from 'express';

import {
  getContactsController,
  createContactController,
  getContactController,
  deleteContactController,
  updContactController,
} from '../controllers/contacts.js';

import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', isValidId, ctrlWrapper(getContactController));
router.post(
  '/',
  upload.single('photo'),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:id',
  jsonParser,
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:id',
  upload.single('photo'),
  jsonParser,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updContactController),
);

export default router;
