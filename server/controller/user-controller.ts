import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../utils';
import asyncHandler from 'express-async-handler';

// @desc Auth user/set token
//route POST /api/users/auth
// @access Public

export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register
//route POST /api/users/
// @access Public

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
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
        profile: { bio: user.profile.bio, skills: user.profile.skills },
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  },
);

// @desc Get User Profile
//route POST /api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'Got User Profile' });
});
