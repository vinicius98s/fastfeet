import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { Errors } from '@types';
import { secret } from '@config/auth';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: Errors.UNAUTHORIZED_REQUEST });

  const [, token] = authorization.split(' ');

  try {
    const decodedUser = await promisify(jwt.verify)(token, secret);
    req.userId = (decodedUser as { id: number }).id;
  } catch (e) {
    return res.status(401).json({ message: Errors.INVALID_TOKEN });
  }

  return next();
}
