import express, { Request, Response, NextFunction } from 'express';

const app = express();

interface CustomRequest extends Request {
  clientIp?: string;
}


export const ipLoggerMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  app.set('trust proxy', true); // render utilizes proxy to handle requests coming into my app.

  // Extract the client's IP
  const clientIp = req.headers['x-forwarded-for'];
  console.log('Client IP:', clientIp);

  // Add the IP to the request object for further processing
  req.clientIp = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  next();
};