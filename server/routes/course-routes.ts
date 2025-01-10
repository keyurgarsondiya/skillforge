import express from 'express';
import { getCourses } from '../controller';

const router = express.Router();

// Course Routes
router.get('/', getCourses);

export default router;
