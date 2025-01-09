import express from 'express';
import { authUser, registerUser } from '../controller';
import { protect } from '../middleware';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/profile', protect, authUser);

export default router;
