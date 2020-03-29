import { Request, Response } from 'express';
import * as yup from 'yup';

import Deliveryman from '@models/Deliveryman';
import validateData from '@utils/validateData';

const index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deliverymen = await Deliveryman.findAll();
    return res.json(deliverymen);
  } catch (e) {
    return res.status(500).json({ message: 'Failed to list deliveryman' });
  }
};

const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const storeSchema = yup.object().shape({
      name: yup.string().required('Deliveryman name is required'),
      email: yup
        .string()
        .email()
        .required(),
      avatar_id: yup.number(),
    });

    const validationErrors = await validateData(storeSchema, req.body);
    if (validationErrors) {
      return res.status(400).json(validationErrors);
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });
    if (deliverymanExists) {
      return res.status(400).json({ message: 'Deliveryman already exists' });
    }

    const newDeliveryman = await Deliveryman.create(req.body);
    return res.json(newDeliveryman);
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Could not create the deliveryman' });
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman)
      return res.status(400).json({ message: 'Deliveryman not found' });

    const updateSchema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      avatar_id: yup.number(),
    });

    const validationErrors = await validateData(updateSchema, req.body);

    if (validationErrors) {
      return res.status(400).json(validationErrors);
    }

    const updatedDeliveryman = await deliveryman.update(req.body);
    return res.json(updatedDeliveryman);
  } catch (e) {
    return res.status(500).send({ message: 'Error updating deliveryman' });
  }
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const numAffectedRows = await Deliveryman.destroy({ where: { id } });
    if (numAffectedRows > 0) return res.status(204).send();

    return res.status(404).json({ message: 'Deliveryman not found' });
  } catch (e) {
    return res.status(500).json({ message: 'Error' });
  }
};

export default {
  index,
  store,
  update,
  remove,
};
