import supertest from 'supertest';
import app from '../index';
import sharp from 'sharp';
import imageProcessor from '../utilities/imageProcessor';
import path from 'path';
import fs from 'fs';

const request = supertest(app);

describe('1. Test imageProcessor', (): void => {
  it('resize image properly', async (): Promise<void> => {
    const testFolder = 'images/test';
    if (!fs.existsSync(testFolder)) {
      fs.mkdirSync(testFolder);
    }
    const originalFilepathRel = `images/full/fjord.jpg`;
    const originalFilepathAbs = path.resolve(originalFilepathRel);
    const targetFilepathRel = `images/test/fjord-100-100.jpg`;
    const targetFilepathAbs = path.resolve(targetFilepathRel);
    await imageProcessor.resizeImage(
      originalFilepathAbs,
      targetFilepathAbs,
      100,
      100
    );

    const metadata = await sharp(targetFilepathAbs).metadata();
    expect(metadata.width).toBe(100);
    expect(metadata.height).toBe(100);
  });
});

describe('2. Test endpoint response', (): void => {
  it('gets the /images/list endpoint', async (): Promise<void> => {
    await request.get('/images/list').expect(200);
  });
});

describe('3. Test image resizing', (): void => {
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
