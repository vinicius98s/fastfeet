import faker from 'faker';

import Deliveryman from '@models/Deliveryman';

import authenticatedRequest from '@tests/helpers/authenticatedRequest';

describe('Deliveryman', () => {
  it('can list all deliverymen', async () => {
    await Deliveryman.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });

    const response = await authenticatedRequest({
      method: 'get',
      path: '/deliverymen',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should be able to add a deliveryman', async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();

    const response = await authenticatedRequest({
      method: 'post',
      data: {
        name,
        email,
      },
      path: '/deliverymen',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', name);
    expect(response.body).toHaveProperty('email', email);
  });

  it('cannot add a deliveryman with missing fields', async () => {
    const response = await authenticatedRequest({
      method: 'post',
      data: {
        name: faker.name.findName(),
      },
      path: '/deliverymen',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('errors');
  });

  it('should be able to update a deliveryman', async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();

    const deliveryman = await Deliveryman.create({
      name,
      email,
    });

    const response = await authenticatedRequest({
      method: 'put',
      data: {
        name: 'Testing',
      },
      path: `/deliverymen/${deliveryman.id}`,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Testing');
  });

  it('should be able to remove a deliveryman', async () => {
    const deliveryman = await Deliveryman.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });

    const response = await authenticatedRequest({
      method: 'delete',
      path: `/deliverymen/${deliveryman.id}`,
    });

    expect(response.status).toBe(204);
  });
});
