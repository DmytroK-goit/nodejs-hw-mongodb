import express from 'express';
import contactRoutes from './contacts.js';
import authRoutes from './auth.js';

const router = express.Router();

router.use('/contacts', contactRoutes);
router.use('/', authRoutes);

export default router;
