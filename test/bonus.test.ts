import request from 'supertest';
import faker from 'faker';
import app from '../src/app';
import URLS from '../src/utils/urls';
import * as statusCodes from '../src/utils/status-codes/http-status-codes';

jest.setTimeout(30000);
describe('bonus /bonus', () => {
  let token = '';
  const randomServiceId = 1292929292929292920282629;
  let usedId = '';
  /**
   * register user to get a token
   */
  beforeAll(async () => {
    const data = {
      email: faker.internet.email(),
      password: 'password',
    };
    const res = await request(app).post(`${URLS.AUTH_URL}/register`).send(data);
    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    token = res.body.data.user.token;
  });

  /**
   * create a service to get a used promo code
   */
  beforeAll(async () => {
    const res = await request(app)
      .post(`${URLS.SERVICE_URL}`)
      .send({
        description: faker.lorem.sentence(),
        name: faker.random.word(),
      })
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    expect(res.body.data).toHaveProperty('service');
    usedId = res.body.data.service.id;
  });

  /**
   * use the promocode so as to test for a used promocode
   * this can also double as testing for a user being able to use a
   * promocode
   */
  beforeAll(async () => {
    const res = await request(app)
      .post(`${URLS.BONUS_URL}/${usedId}`)
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_CREATED);
    expect(res.body.data).toHaveProperty('bonus');
  });

  it('does not activate a service bonus that does not exist /', async () => {
    const res = await request(app)
      .post(`${URLS.BONUS_URL}/${randomServiceId}`)
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_NOT_FOUND);
    expect(res.body.message).toEqual('This service does not exist');
    expect(res.body.status).toEqual(false);
  });
  it('does not activate a service bonus already used by the customer /', async () => {
    const res = await request(app)
      .post(`${URLS.BONUS_URL}/${usedId}`)
      .set('X-Auth-Token', token);
    expect(res.status).toEqual(statusCodes.HTTP_BAD_REQUEST);
    expect(res.body.message).toEqual(
      'You can not re-activate a bonus you have previously',
    );
    expect(res.body.status).toEqual(false);
  });
});
