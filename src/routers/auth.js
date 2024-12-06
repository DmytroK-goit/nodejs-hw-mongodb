import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { loginController, registerController } from '../controllers/auth';

import { loginSchema, registerSchema } from '../validation/auth';
import { validateBody } from '../middlewares/validateBody';

const router = express.Router();
const jsonParse = express.json();

router.post(
  '/register',
  jsonParse,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);
router.post(
  '/login',
  jsonParse,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);
