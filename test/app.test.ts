import request from 'supertest';
import { HTTP_OK } from '../src/utils/status-codes/http-status-codes';
import app from '../src/app';

describe('home', () => {
  it('appropriate message', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).toEqual(HTTP_OK);
        expect(res.text).toEqual('Hello! Welcome!');
        done();
      });
  });
});
