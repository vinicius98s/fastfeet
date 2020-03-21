import { Request, Response } from 'express';

import Recipient from '../models/Recipient';

const store = async (req: Request, res: Response): Promise<Response> => {
  const { street, number, complement, city, state, zip_code } = req.body;
  if (!street || !number || !city || !state || !zip_code) {
    return res.status(400).json({ message: 'Passa pra enum dps' });
  }

  console.log('typeof number', typeof number);

  const newRecipient = await Recipient.create({
    street,
    number,
    complement,
    city,
    state,
    zip_code,
  });

  return res.json(newRecipient);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  return res.json({ ok: true });
};

export default {
  store,
  update,
};
