import faker from 'faker';

import authenticatedRequest from '@tests/helpers/authenticatedRequest';

import Recipient from '@models/Recipient';
import Deliveryman from '@models/Deliveryman';
import Order from '@models/Order';

import { OrderErrors } from '@types';

describe('Orders', () => {
  let recipient_id: number;
  let deliveryman_id: number;

  beforeAll(async () => {
    const { id: recipientId } = await Recipient.create({
      name: faker.name.findName(),
      street: faker.address.streetName(),
      number: faker.random.number(),
      complement: faker.address.secondaryAddress(),
      state: faker.address.state(),
      city: faker.address.city(),
      zip_code: faker.address.zipCode(),
    });

    const { id: deliverymanId } = await Deliveryman.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });

    recipient_id = recipientId;
    deliveryman_id = deliverymanId;
  });

  it('can list some orders', async () => {
    await Promise.all(
      new Array(10).fill(null).map(() =>
        Order.create({
          deliveryman_id,
          recipient_id,
          product: faker.commerce.productName(),
        })
      )
    );

    const response = await authenticatedRequest({
      method: 'get',
      path: '/orders',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders).toHaveLength(10);
  });

  it('can place an order', async () => {
    const order = {
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
    };

    const response = await authenticatedRequest({
      method: 'post',
      data: order,
      path: '/orders',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it("can't add an order with start date before 8am", async () => {
    const order = {
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
      start_date: new Date().setHours(7, 20),
    };

    const response = await authenticatedRequest({
      method: 'post',
      data: order,
      path: '/orders',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', OrderErrors.INVALID_HOUR);
  });

  it("can't add an order with start date after 18pm", async () => {
    const order = {
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
      start_date: new Date().setHours(19, 12),
    };

    const response = await authenticatedRequest({
      method: 'post',
      data: order,
      path: '/orders',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', OrderErrors.INVALID_HOUR);
  });

  it('can change the start date of an order', async () => {
    const { id } = await Order.create({
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
    });

    const start_date = new Date().setHours(8, 35);
    const response = await authenticatedRequest({
      method: 'put',
      data: {
        start_date,
      },
      path: `/orders/${id}`,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', id);
  });

  it('is not possible to withdraw an order before 8am', async () => {
    const { id } = await Order.create({
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
    });

    const start_date = new Date().setHours(7, 20);
    const response = await authenticatedRequest({
      method: 'put',
      data: {
        start_date,
      },
      path: `/orders/${id}`,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('is not possible to withdraw an order after 18pm', async () => {
    const { id } = await Order.create({
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
    });

    const start_date = new Date().setHours(19, 20);
    const response = await authenticatedRequest({
      method: 'put',
      data: {
        start_date,
      },
      path: `/orders/${id}`,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it("can't update a nonexistent order", async () => {
    const response = await authenticatedRequest({
      method: 'put',
      path: `/orders/99`,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', OrderErrors.NOT_FOUND);
  });

  it('can register an end date for an order', async () => {
    const { id } = await Order.create({
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
    });

    const end_date = new Date().setHours(13, 38);
    const response = await authenticatedRequest({
      method: 'put',
      data: {
        end_date,
      },
      path: `/orders/${id}`,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', id);
  });

  it("can't add an order without a deliveryman", async () => {
    const order = {
      recipient_id,
      product: faker.commerce.productName(),
    };

    const response = await authenticatedRequest({
      method: 'post',
      data: order,
      path: '/orders',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('errors');
  });

  it("can't add an order without a recipient", async () => {
    const order = {
      deliveryman_id,
      product: faker.commerce.productName(),
    };

    const response = await authenticatedRequest({
      method: 'post',
      data: order,
      path: '/orders',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('errors');
  });

  it('can remove an order', async () => {
    const { id } = await Order.create({
      recipient_id,
      deliveryman_id,
      product: faker.commerce.productName(),
    });

    const response = await authenticatedRequest({
      method: 'delete',
      path: `/orders/${id}`,
    });

    expect(response.status).toBe(204);
  });
});
