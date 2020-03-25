import { Request, Response } from 'express';

import Recipient from '@models/Recipient';

const store = async (req: Request, res: Response): Promise<Response> => {
  const newRecipient = await Recipient.create(req.body);
  return res.json(newRecipient);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const recipient = await Recipient.findByPk(id);

  if (recipient) {
    if (!req.body.complement) recipient.complement = null;
    const newRecipient = await recipient.update(req.body);
    return res.json(newRecipient);
  }

  return res.status(404).json({ message: 'Recipient not found' });
};

export default {
  store,
  update,
};
