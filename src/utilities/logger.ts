import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction): void => {
  let url = req.url;
  console.log(`${url} was visited`);
  next();
};

export default logger;
