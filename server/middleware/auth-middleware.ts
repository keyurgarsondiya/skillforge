import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { User } from '../models';

import dotenv from 'dotenv';

dotenv.config();

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;
  console.log('Token: ', token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log('Decoded: ', decoded);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    throw new Error('Not authorized, no token');
  }
});

export { protect };
