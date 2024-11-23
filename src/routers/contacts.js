import express from 'express';

import {
  getContactsController,
  createContactController,
  getContactController,
  deleteContactController,
  updContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', ctrlWrapper(getContactController));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.delete('/:id', jsonParser, ctrlWrapper(deleteContactController));
router.patch('/:id', jsonParser, ctrlWrapper(updContactController));

export default router;
