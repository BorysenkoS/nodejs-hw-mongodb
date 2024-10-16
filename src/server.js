import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { getAllContacts, getContactByID } from './services/contacts.js';

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

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await getContactByID(id);

      if (contact === null) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
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
