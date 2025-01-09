import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import { User } from '../models';

import { Types } from 'mongoose';
import { COOKIE_NAME } from '../constants';

interface MyJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
}

export const authorize = asyncHandler(
  async (req: any, res: any, next: any) => {},
);

export const protect = asyncHandler(async (req: any, res: any, next: any) => {
  const token = req.cookies[COOKIE_NAME];
  console.log('Token: ', token);

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
      ) as MyJwtPayload;
      console.log('Decoded: ', decoded);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.log('Error: ', error);
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    throw new Error('Not authorized, no token');
  }
});
