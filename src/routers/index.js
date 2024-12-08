import express from 'express';
import contactRoutes from './contacts.js';
import authRoutes from './auth.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();
router.use('/', authRoutes);

router.use('/contacts', auth, contactRoutes);

export default router;
