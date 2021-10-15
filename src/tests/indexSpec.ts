import { response } from 'express';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('1. Test endpoint response', () => {
  it('gets the /images/list endpoint', async () => {
    const response = await request.get('/images/list');
    expect(response.status).toBe(200);
  });
});

describe('2. Test image resizing', () => {
  it('successfully resize an image', async () => {
    const response = await request
      .get('/images/resize')
      .query({ filename: 'fjord', width: 100, height: 100 })
      .expect(200);
  });
  it('failed resize an image because of wrong input', async () => {
    const response = await request
      .get('/images/resize')
      .query({ filename: 'fjord.jpg', width: 100, height: 100 })
      .expect(400);
  });
});
