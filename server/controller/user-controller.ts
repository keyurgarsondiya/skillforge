import { Request, Response } from 'express';

// @desc Auth user/set token
//route POST /api/users/auth
// @access Public

export const authUser = (req: Request, res: Response) => {
  const {} = req.body;
  res.status(201).json({ message: 'Authenticating' });
};

// @desc Register
//route POST /api/users/
// @access Public

export const registerUser = (req: Request, res: Response) => {
  const { role } = req.body;
  console.log('Role: ', role);
  res.status(201).json({ message: 'Registering Student' });
};
