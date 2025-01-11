import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../utils';
import asyncHandler from 'express-async-handler';
import { COOKIE_NAME } from '../constants';
import cookieParser from 'cookie-parser';

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

// @desc Verify user
//route POST /api/users/verify
// @access Public

export const verifyUser = asyncHandler(async (req: any, res: Response) => {
  const user = req.user;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    // Add any other user fields you need
  });
});

// @desc Register
//route POST /api/users/
// @access Public

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role, profile } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      profile,
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

// @desc Logout
//route POST /api/users/logout
// @access Public

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie(COOKIE_NAME, '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({ message: 'User logged out' });
});

// @desc Get User Profile
//route GET /api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req: any, res: any) => {
  const { _id, name, email } = req.user;
  res.status(201).json({ _id, name, email });
});

// @desc Update User Profile
//route PUT /api/users/profile
// @access Private

export const updateUserProfile = asyncHandler(async (req: any, res: any) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body?.name || user.name;
    user.email = req.body?.email || user.email;
    user.profile.bio = req.body?.profile?.bio || user.profile.bio;
    user.profile.skills = req.body?.profile?.skills || user.profile.skills;

    if (req.body.password) {
      // Here password will save in bcrypt as pre save method will run in next line
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profile: updatedUser.profile,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(201).json({ message: 'Updated user profile' });
});
