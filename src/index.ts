import express from 'express';
import path from 'path';
import logger from './utilities/logger';
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import fs from 'fs';

const app = express();
const port = 3000;

// Image API homepage
app.get('/', (req, res) => {
  res.send('This is the homepage for image handling');
});

// Provide the current image list
app.get('/images/list', logger, async (req, res) => {
  try {
    const imageFolder = path.resolve(`images/full`);
    const filenames = await readdir(imageFolder);
    const imagenames = filenames.map(f => f.split('.')[0]);
    res.send(imagenames);
  } catch (err) {
    res.send('There is an error');
  }
});

// Provide resized image
app.get('/images/resize', logger, async (req, res) => {
  const filename = req.query.filename;
  const height = req.query.height;
  const width = req.query.width;
  const originalFilepathRel = `images/full/${filename}.jpg`;
  const originalFilepathAbs = path.resolve(originalFilepathRel);
  if (fs.existsSync(originalFilepathAbs)) {
    const targetFilepathRel = `images/thumb/${filename}.jpg`;
    const targetFilepathAbs = path.resolve(targetFilepathRel);
    await sharp(originalFilepathAbs)
      .resize(Number(width), Number(height))
      .toFile(targetFilepathAbs);
    res.sendFile(targetFilepathAbs);
  } else {
    res.status(400);
    res.send('Image does not exist');
  }
});

// Print message in terminal
app.listen(port, () => {
  console.log(`server started at localhost: ${port}`);
});

export default app;
