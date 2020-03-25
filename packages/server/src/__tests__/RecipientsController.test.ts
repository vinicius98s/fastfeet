import request from 'supertest';

import app from '@app';

import truncate from '@tests/utils/truncate';
import createAdminUser from '@tests/helpers/createAdminUser';
import { Errors } from '@types';

describe('Recipients', () => {
  const { createUser, email, password } = createAdminUser();
  const recipient = {
    name: 'Jhon Doe',
    street: 'St. Hollywood',
    number: 7,
    complement: 'Near the local school',
    state: 'Arkansas',
    city: 'Little Rock',
    zip_code: '72201',
  };

  beforeEach(async () => {
    await truncate();
    await createUser();
  });

  const getAuthenticationToken = async (): Promise<string> => {
    const response = await request(app)
      .post('/session')
      .send({ email, password });

    const { token } = response.body;
    return token;
  };

  const getRecipientResponse = async () => {
    const token = await getAuthenticationToken();
    const response = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `Bearer ${token}`);
    return response;
  };

  it('should be able to register a recipient', async () => {
    const response = await getRecipientResponse();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to update the recipient', async () => {
    const { body: recipientToUpdate } = await getRecipientResponse();
    const newRecipient = {
      name: 'Glen Clark',
      street: 'Marsh Dr. Shirley',
      number: 630,
      state: 'New York',
      city: 'Arlington',
      zip_code: '11967',
    };

    const token = await getAuthenticationToken();
    const response = await request(app)
      .put(`/recipients/${recipientToUpdate.id}`)
      .send(newRecipient)
      .set('Authorization', `Bearer ${token}`);

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
    const { body: recipientToUpdate } = await getRecipientResponse();

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
});
