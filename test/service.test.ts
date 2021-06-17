import request from 'supertest';
import faker from 'faker';
import app from '../src/app';
import URLS from '../src/utils/urls';
import * as statusCodes from '../src/utils/status-codes/http-status-codes';

jest.setTimeout(30000);
describe('service /service', () => {
  let token = '';
  beforeAll(async () => {
    const data = {
      email: faker.internet.email(),
      password: 'password',
    };
    const res = await request(app).post(`${URLS.AUTH_URL}/register`).send(data);
    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    token = res.body.data.user.token;
  });

  it('should not create a service w/o a name /', async () => {
    const res = await request(app)
      .post(`${URLS.SERVICE_URL}`)
      .send({ description: faker.lorem.sentence() })
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual('Unable to create Service');
    expect(res.body.status).toEqual(false);
  });

  it('should not create a service w/o a description /', async () => {
    const res = await request(app)
      .post(`${URLS.SERVICE_URL}`)
      .send({ email: faker.internet.email() })
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual('Unable to create Service');
    expect(res.body.status).toEqual(false);
  });

  it('should create a service /', async () => {
    const res = await request(app)
      .post(`${URLS.SERVICE_URL}`)
      .send({
        description: faker.lorem.sentence(),
        name: faker.vehicle.vehicle(),
      })
      .set('X-Auth-Token', token);

    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    expect(res.body.message).toEqual('Service Created');
    expect(res.body.status).toEqual(true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('service');
  });

  it('should fetch services /', async () => {
    const res = await request(app)
      .get(`${URLS.SERVICE_URL}`)
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_OK);
    expect(res.body.message).toEqual('Fetched Services');
    expect(res.body.status).toEqual(true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('services');
  });

});
