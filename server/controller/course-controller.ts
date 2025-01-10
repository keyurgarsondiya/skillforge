import asyncHandler from 'express-async-handler';
import { Course } from '../models';

// @desc Get All Courses
//route GET /api/courses
// @access Public

export const getCourses = asyncHandler(async (req: any, res: any) => {
  const courses = await Course.find().populate('instructor', 'name email');
  res.status(201).json(courses);
});
