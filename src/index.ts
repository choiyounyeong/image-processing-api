import express from 'express';
import path from 'path';

const app = express();
const port = 3000;
const sharp = require('sharp');

app.get('/api/images', async (req, res) => {
  const filename = req.query.filename;
  const height = req.query.height;
  const width = req.query.width;
  const originalFilepathRel = `images/full/${filename}.jpg`;
  const originalFilepathAbs = path.resolve(originalFilepathRel);
  const targetFilepathRel = `images/thumb/${filename}.jpg`;
  const targetFilepathAbs = path.resolve(targetFilepathRel);
  await sharp(originalFilepathAbs)
    .resize(Number(width), Number(height))
    .toFile(targetFilepathAbs);
  res.sendFile(targetFilepathAbs);
});

app.listen(port, () => {
  console.log(`server started at localhost: ${port}`);
});

export default app;
