import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../utils';

// @desc Auth user/set token
//route POST /api/users/auth
// @access Public

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc Register
//route POST /api/users/
// @access Public

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role, avatar, isActive } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar,
    isActive,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isActive: user.isActive,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};
