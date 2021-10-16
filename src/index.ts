import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import logger from './utilities/logger';
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import fs from 'fs';

const app = express();
const port = 3000;

// Image API homepage
app.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    res.send('This is the homepage for image handling');
  }
);

// Provide the current image list
app.get(
  '/images/list',
  logger,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const imageFolder = path.resolve(`images/full`);
      const filenames = await readdir(imageFolder);
      const imagenames = filenames.map(f => f.split('.')[0]);
      res.send(imagenames);
    } catch (err) {
      res.send('There is an error');
    }
  }
);

// Provide resized image
app.get(
  '/images/resize',
  logger,
  async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename;
    const height = Number(req.query.height);
    const width = Number(req.query.width);

    if (isNaN(height) || isNaN(width)) {
      res.status(400);
      res.send('Invalid height and width');
      return;
    }

    const originalFilepathRel = `images/full/${filename}.jpg`;
    const originalFilepathAbs = path.resolve(originalFilepathRel);
    if (fs.existsSync(originalFilepathAbs)) {
      const targetFilepathRel = `images/thumb/${filename}-${width}-${height}.jpg`;
      const targetFilepathAbs = path.resolve(targetFilepathRel);
      // if already exists(cached), just return
      if (fs.existsSync(targetFilepathAbs)) {
        res.sendFile(targetFilepathAbs);
      } else {
        await sharp(originalFilepathAbs)
          .resize(width, height)
          .toFile(targetFilepathAbs);
        res.sendFile(targetFilepathAbs);
      }
    } else {
      res.status(400);
      res.send('Image does not exist');
    }
  }
);

app.listen(port);

export default app;
