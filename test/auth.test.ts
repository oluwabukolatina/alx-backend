import request from 'supertest';
import faker from 'faker';
import app from '../src/app';
import URLS from '../src/utils/urls';
import * as statusCodes from '../src/utils/status-codes/http-status-codes';


jest.setTimeout(30000);
describe('authentication /auth', () => {
  let email = '';
  beforeAll(async () => {
    const data = {
      email: faker.internet.email(),
      password: 'password',
    };
    const res = await request(app).post(`${URLS.AUTH_URL}/register`).send(data);
    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    email = data.email;
  });

  it('should not register a user without email /register', async () => {
    const res = await request(app)
      .post(`${URLS.AUTH_URL}/register`)
      .send({ password: faker.random.word() });
    expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual('Unable to register');
    expect(res.body.status).toEqual(false);
  });

  it('should not register a user w/o password /register', async () => {
    const res = await request(app)
      .post(`${URLS.AUTH_URL}/register`)
      .send({ email: faker.internet.email() });
      expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual('Unable to register');
    expect(res.body.status).toEqual(false);
  });

  it('should register a user /register', async () => {
    const res = await request(app)
      .post(`${URLS.AUTH_URL}/register`)
      .send({ email: faker.internet.email(), password: faker.random.word() });
    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    expect(res.body.message).toEqual('User Created');
    expect(res.body.status).toEqual(true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('user');
  });

  it('should not login a user without email /login', async () => {
    const res = await request(app)
      .post(`${URLS.AUTH_URL}/login`)
      .send({ password: 'password' });
    expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual('Unable to login');
    expect(res.body.status).toEqual(false);
    expect(res.body).toHaveProperty('error');
  });

  it('should not login a user without password /login', async () => {
    const res = await request(app)
      .post(`${URLS.AUTH_URL}/login`)
        .send({ email,  });
    expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual('Unable to login');
    expect(res.body.status).toEqual(false);
    expect(res.body).toHaveProperty('error');
  });
  it('should login a user /login', async () => {
    const res = await request(app)
      .post(`${URLS.AUTH_URL}/login`)
      .send({ email, password: 'password' });
    expect(res.status).toEqual(statusCodes.HTTP_OK);
    expect(res.body.message).toEqual('Log in successful');
    expect(res.body.status).toEqual(true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('user');
  });
});
