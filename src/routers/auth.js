import express from 'express';

import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  requestResetPasswordController,
  resetPasswordController,
} from '../controllers/auth.js';

import {
  loginSchema,
  registerSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

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
router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post(
  '/request-reset-password',
  jsonParse,
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetPasswordController),
);

router.post(
  '/reset-password',
  jsonParse,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default router;
