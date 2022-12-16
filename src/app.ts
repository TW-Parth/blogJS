import compression from 'compression';
import cors from 'cors';
import debug from 'debug';
import 'dotenv/config';
import { EventEmitter } from 'events';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { extendReqMiddleware } from './middlewares/extendReq.middleware';
import router from './routes/index';
import dbInit from './db/init'
dbInit()
const logger = debug('app:app');

const { ENVIRONMENT, PORT } = process.env;
export const ee = new EventEmitter();

export const app = express();
export const server = new Server(app);

app.locals.ee = ee;

export async function startServer() {
  // body-parser needed to parse form-data bodies
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000 }));

  app.enable('trust proxy');

  // extend req and res
  app.use(extendReqMiddleware());

  // Disable x-powered-by header
  app.disable('x-powered-by');
  app.set('env', ENVIRONMENT);

  // Handle `OPTIONS` request.
  app.all('*', handleOptions);

  // delete all headers related to cache
  app.use(deleteCacheHeaders);

  // compression responses
  app.use(compression({ threshold: 512 }));

  // enabling CORS for all routes.
  app.use(cors({ credentials: true, origin: true }));
  app.use(helmet());

  // load routes
  app.use('/v1', router);

  // It works route
  app.get('/', itworks);

  app.use('*', (req: Request, res: Response) => {
    return res.status(200).send();
  });

  await listen({ server: server });

  return Promise.resolve();
}

async function listen({ server }: { server: Server }) {
  server.listen(PORT, async () => {
    logger(`Listening on port ${PORT}`);
    
    return Promise.resolve();
  });
}

async function handleOptions(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language, x-client-id, x-client-secret, x-client-device, x-rmm-auth-token',
  );

  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}

async function deleteCacheHeaders(req: Request, res: Response, next: NextFunction) {
  req.headers['if-none-match'] = '';
  req.headers['if-modified-since'] = '';
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');

  next();
}

async function itworks(req: Request, res: Response) {
  res.ok();
}
