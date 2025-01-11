import express from 'express';
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
  verifyUser,
} from '../controller';
import { protect } from '../middleware';
import { Role } from '../constants';

const router = express.Router();

// User Routes
router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post(
  '/verify',
  protect(Role.Instructor, Role.Admin, Role.Student),
  verifyUser,
);
router
  .route('/profile')
  .get(protect(Role.Instructor, Role.Admin, Role.Student), getUserProfile)
  .put(protect(Role.Instructor, Role.Admin, Role.Student), updateUserProfile);

export default router;
