import request from 'supertest';
import faker from 'faker';

import app from '@app';

import Recipient, { IRecipient } from '@models/Recipient';
import truncate from '@tests/utils/truncate';
import createAdminUser from '@tests/helpers/createAdminUser';
import authenticatedRequest from '@tests/helpers/authenticatedRequest';
import { Errors } from '@types';

describe('Recipients', () => {
  const { createUser } = createAdminUser();
  const recipient: IRecipient = {
    name: faker.name.findName(),
    street: faker.address.streetName(),
    number: faker.random.number(),
    complement: faker.address.secondaryAddress(),
    state: faker.address.state(),
    city: faker.address.city(),
    zip_code: faker.address.zipCode(),
  };

  beforeEach(async () => {
    await truncate();
    await createUser();
  });

  const getRecipientResponse = async <T extends IRecipient>(recipient: T) => {
    return await authenticatedRequest({
      data: recipient,
      method: 'post',
      path: `/recipients`,
    });
  };

  it('should be able to register a recipient', async () => {
    const response = await getRecipientResponse(recipient);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to update the recipient', async () => {
    const recipientToUpdate = await Recipient.create(recipient);
    const newRecipient = {
      name: 'Glen Clark',
      street: 'Marsh Dr. Shirley',
      number: 630,
      state: 'New York',
      city: 'Arlington',
      zip_code: '11967',
    };

    const response = await authenticatedRequest({
      data: newRecipient,
      method: 'put',
      path: `/recipients/${recipientToUpdate.id}`,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', recipientToUpdate.id);
    expect(response.body).toHaveProperty('name', newRecipient.name);
    expect(response.body).toHaveProperty('street', newRecipient.street);
    expect(response.body).toHaveProperty('number', newRecipient.number);
    expect(response.body).toHaveProperty('complement', null);
    expect(response.body).toHaveProperty('state', newRecipient.state);
    expect(response.body).toHaveProperty('city', newRecipient.city);
    expect(response.body).toHaveProperty('zip_code', newRecipient.zip_code);
  });

  it('is not possible to add recipients unauthenticated', async () => {
    const response = await request(app)
      .post('/recipients')
      .send(recipient);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      Errors.UNAUTHORIZED_REQUEST
    );
  });

  it('is not possible to update recipients unauthenticated', async () => {
    const { body: recipientToUpdate } = await getRecipientResponse(recipient);
    const response = await request(app)
      .put(`/recipients/${recipientToUpdate.id}`)
      .send({
        ...recipientToUpdate,
        name: 'Trying to update',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      Errors.UNAUTHORIZED_REQUEST
    );
  });

  it('is not possible to add a recipient with missing fields', async () => {
    const response = await getRecipientResponse<any>({
      ...recipient,
      name: undefined,
      state: '',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('errors');
  });

  it('is not possible to update a recipient with invalid fields', async () => {
    const recipientToUpdate = await Recipient.create(recipient);

    const response = await authenticatedRequest({
      data: {
        ...recipient,
        name: '',
        zip_code: '123',
      },
      method: 'put',
      path: `/recipients/${recipientToUpdate.id}`,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('errors');
  });

  it('should be able to delete a recipient', async () => {
    const recipientToDelete = await Recipient.create(recipient);
    const response = await authenticatedRequest({
      method: 'delete',
      path: `/recipients/${recipientToDelete.id}`,
    });

    expect(response.status).toBe(204);
  });

  it('is not possible to delete a recipient unauthenticated', async () => {
    const recipientToDelete = await Recipient.create(recipient);
    const response = await request(app).delete(
      `/recipients/${recipientToDelete.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      Errors.UNAUTHORIZED_REQUEST
    );
  });
});
