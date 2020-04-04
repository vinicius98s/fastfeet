import { Request, Response } from 'express';
import * as yup from 'yup';

import { RecipientErrors } from '@types';
import Recipient, { IRecipient } from '@models/Recipient';

import validateData from '../utils/validateData';

const store = async (req: Request, res: Response): Promise<Response> => {
  const storeRecipientSchema = yup.object().shape({
    name: yup
      .string()
      .required(RecipientErrors.REQUIRED_NAME)
      .min(3, RecipientErrors.SHORT_NAME),
    street: yup.string().required(RecipientErrors.REQUIRED_STREET),
    number: yup.number().required(RecipientErrors.REQUIRED_NUMBER),
    complement: yup.string(),
    city: yup.string().required(RecipientErrors.REQUIRED_CITY),
    zip_code: yup.string().required(RecipientErrors.REQUIRED_ZIP_CODE),
    state: yup.string().required(RecipientErrors.REQUIRED_STATE),
  });

  const recipient = req.body as IRecipient;

  const validationErrors = await validateData(storeRecipientSchema, recipient);

  if (validationErrors) return res.status(400).json(validationErrors);

  const newRecipient = await Recipient.create(recipient);
  return res.json(newRecipient);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const recipient = await Recipient.findByPk(id);

  const updateRecipientSchema = yup.object().shape({
    name: yup.string().min(3, RecipientErrors.SHORT_NAME),
    street: yup.string().min(1, RecipientErrors.INVALID_STREET),
    number: yup.number(),
    complement: yup.string().nullable(),
    city: yup.string().min(1, RecipientErrors.INVALID_CITY),
    zip_code: yup.string().min(5, RecipientErrors.INVALID_ZIP_CODE),
    state: yup.string().min(1, RecipientErrors.INVALID_STATE),
  });

  if (recipient) {
    const updateRecipient = req.body;

    const validationErrors = await validateData(
      updateRecipientSchema,
      updateRecipient
    );

    if (validationErrors) return res.status(400).json(validationErrors);

    if (!updateRecipient.complement) recipient.complement = null;
    const newRecipient = await recipient.update(updateRecipient);
    return res.json(newRecipient);
  }

  return res.status(404).json({ message: RecipientErrors.RECIPIENT_NOT_FOUD });
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const numAffectedRows = await Recipient.destroy({ where: { id } });
    if (numAffectedRows > 0) return res.status(204).send();

    return res
      .status(404)
      .json({ message: RecipientErrors.RECIPIENT_NOT_FOUD });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Error' });
  }
};

export default {
  store,
  update,
  remove,
};
