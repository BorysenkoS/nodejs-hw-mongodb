import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    console.log(req.query);
    next();
  });

  app.get('/', (req, res) => {
    res.send('Hello Node.js');
  });

  app.use((req, res, next) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Internal server error');
  });

  app.listen(PORT, () => {
    console.log(`Server was started on port ${PORT}`);
  });
};

export default setupServer;
