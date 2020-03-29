import request from 'supertest';

import app from '@app';

import createAdminUser from './createAdminUser';

interface Params {
  method: 'post' | 'get' | 'delete' | 'put';
  data?: object;
  path: string;
}

export default async function authenticatedResponse({
  method,
  data,
  path,
}: Params): Promise<request.Response> {
  const { email, password, createUser } = createAdminUser();
  await createUser();

  const {
    body: { token },
  } = await request(app)
    .post('/session')
    .send({ email, password });

  const response = await request(app)
    [method](path)
    .send(data)
    .set('Authorization', `Bearer ${token}`);

  return response;
}
