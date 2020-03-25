import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '@models/User';
import { Errors } from '@types';
import { secret, expiresIn } from '@config/auth';

export interface EncondedTokenInfo {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email && !password)
      return res.status(400).json({ message: Errors.MISSING_CREDENTIALS });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: Errors.USER_NOT_FOUND });

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
