import jwt, { Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (res: any, userId: Types.ObjectId) => {
  const token = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '30d',
    },
  );
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
