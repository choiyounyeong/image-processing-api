import express from 'express';
import { Request, Response } from 'express';
import imageRoute from './routes/images';

const app = express();
const port = 3000;

// Image API homepage
app.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    res.send('This is the homepage for image handling');
  }
);

app.use('/images', imageRoute);

app.listen(port);

export default app;
