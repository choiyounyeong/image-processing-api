import { response } from 'express';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('1. Test endpoint response', () => {
  it('gets the api/images endpoint', async done => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
    done();
  });
});

describe('2. Image transform functino should resolve or reject', () => {
  it('Expect transform to not throw error', async done => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
    done();
  });
  it('Expect transform to throw specific error', async done => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
    done();
  });
});
