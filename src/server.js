import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(router);

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server was started on port ${PORT}`);
  });
};

export default setupServer;
