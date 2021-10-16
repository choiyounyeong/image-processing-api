import { response } from 'express';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('1. Test endpoint response', (): void => {
  it('gets the /images/list endpoint', async (): Promise<void> => {
    await request.get('/images/list').expect(200);
  });
});

describe('2. Test image resizing', (): void => {
  it('successfully resize an image', async (): Promise<void> => {
    await request
      .get('/images/resize')
      .query({ filename: 'fjord', width: 100, height: 100 })
      .expect(200);
  });
  it('failed resize an image because of wrong filename', async (): Promise<
    void
  > => {
    await request
      .get('/images/resize')
      .query({ filename: 'fjord.jpg', width: 100, height: 100 })
      .expect(400);
  });
  it('failed resize an image because of wrong width and height', async (): Promise<
    void
  > => {
    await request
      .get('/images/resize')
      .query({ filename: 'fjord', width: 'very fat', height: 'very tall' })
      .expect(400);
  });
});
