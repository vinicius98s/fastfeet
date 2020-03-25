import request from 'supertest';

import app from '@app';
import truncate from '@tests/utils/truncate';
import createAdminUser from '@tests/helpers/createAdminUser';
import { Errors } from '@types';

describe('Authentication', () => {
  const { createUser, email, password } = createAdminUser();

  beforeAll(async () => {
    await truncate();
    await createUser();
  });

  it('should receive a token with valid credentials', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        email,
        password,
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toHaveProperty('email', email);
  });

  it('should not authenticate with incorrect password', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        email,
        password: 'incorrect',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      Errors.INCORRECT_CREDENTIALS
    );
  });

  it('should not receive a token with non exitent user', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        email: 'fake@gmail.com',
        password: '123',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', Errors.USER_NOT_FOUND);
  });
});
