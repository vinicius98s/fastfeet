import { Router, Request, Response } from 'express';

import User from './app/models/User';

const routes = Router();

routes.get('/user', async (req: Request, res: Response) => {
  const user = await User.create({
    name: 'Vinicius Sales Alves',
    email: 'vinicius@sales.com',
    password_hash: 'vinicius',
  });
  res.json(user);
});

export default routes;
