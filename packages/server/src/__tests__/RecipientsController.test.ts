import request from 'supertest';

import app from '@app';

import truncate from '@tests/utils/truncate';
import createAdminUser from '@tests/helpers/createAdminUser';

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

  beforeAll(async () => {
    await truncate();
    await createUser();
    await request(app)
      .post('/session')
      .send({
        email,
        password,
      });
  });

  it('should be able to register a recipient', async () => {
    const response = await request(app)
      .post('/recipients')
      .send(recipient);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
