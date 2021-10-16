import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import logger from '../utilities/logger';
import imageProcessor from '../utilities/imageProcessor';
import { readdir } from 'fs/promises';
import fs from 'fs';
const imageRoute = express.Router();

// Provide the current image list
imageRoute.get(
  '/list',
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
imageRoute.get(
  '/resize',
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
      const imageSaveFolder = 'images/thumb';
      const targetFilepathRel = `${imageSaveFolder}/${filename}-${width}-${height}.jpg`;
      const targetFilepathAbs = path.resolve(targetFilepathRel);

      if (!fs.existsSync(imageSaveFolder)) {
        fs.mkdirSync(imageSaveFolder);
      }

      // if already exists(cached), just return
      if (fs.existsSync(targetFilepathAbs)) {
        res.sendFile(targetFilepathAbs);
      } else {
        await imageProcessor.resizeImage(
          originalFilepathAbs,
          targetFilepathAbs,
          width,
          height
        );

        res.sendFile(targetFilepathAbs);
      }
    } else {
      res.status(400);
      res.send('Image does not exist');
    }
  }
);
export default imageRoute;
