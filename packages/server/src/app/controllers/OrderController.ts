import { getHours } from 'date-fns/fp';
import { Request, Response } from 'express';
import * as yup from 'yup';

import Order from '@models/Order';
import validateData from '@utils/validateData';

import { Errors, OrderErrors } from '@types';

const validateHour = (date: number | Date) => {
  const hour = getHours(date);
  return hour >= 8 && hour <= 18;
};

const index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await Order.findAll();
    return res.json({ orders });
  } catch (e) {
    return res.status(500).json({ message: Errors.SERVER_ERROR });
  }
};

const store = async (req: Request, res: Response): Promise<Response> => {
  const storeSchema = yup.object().shape({
    recipient_id: yup.number().required(),
    deliveryman_id: yup.number().required(),
    product: yup.string().required(OrderErrors.REQUIRED_PRODUCT),
  });

  const validationErrors = await validateData(storeSchema, req.body);
  if (validationErrors) {
    return res.status(400).json(validationErrors);
  }

  if (req.body.start_date && !validateHour(req.body.start_date)) {
    return res.status(400).json({ message: OrderErrors.INVALID_HOUR });
  }

  const order = await Order.create(req.body);
  return res.json(order);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: OrderErrors.NOT_FOUND });
    }

    const updateSchema = yup.object().shape({
      recipient_id: yup.number().nullable(false),
      deliveryman_id: yup.number().nullable(false),
      product: yup.string(),
    });

    const validationErrors = await validateData(updateSchema, req.body);
    if (validationErrors) {
      return res.status(400).json(validationErrors);
    }

    if (req.body.start_date && !validateHour(req.body.start_date)) {
      return res.status(400).json({ message: OrderErrors.INVALID_HOUR });
    }

    await order.update(req.body);
    return res.send(order);
  } catch (e) {
    return res.status(500).json({ message: Errors.SERVER_ERROR });
  }
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const numAffectedRows = await Order.destroy({ where: { id } });
    if (numAffectedRows > 0) return res.status(204).send();

    return res.status(404).json({ message: 'Order not found' });
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
