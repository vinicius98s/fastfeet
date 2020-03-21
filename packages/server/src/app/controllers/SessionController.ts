import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../models/User';
import { Errors } from '../Types';

import { secret, expiresIn } from '../../config/auth';

const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({ message: Errors.MISSING_CREDENTIALS });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: Errors.USER_NOT_FOUND });
    const isCorrectPassword = await user.checkPassword(password);
    if (isCorrectPassword) {
      const { id, email } = user;
      return res.json({
        user: {
          id,
          email,
        },
        token: jwt.sign({ id }, secret, {
          expiresIn: expiresIn,
        }),
      });
    }

    return res.status(400).json({ message: Errors.INCORRECT_CREDENTIALS });
  } catch (err) {
    console.log('Session error', err);
    return res.json({ message: Errors.GENERIC_ERROR });
  }
};

export default {
  store,
};
