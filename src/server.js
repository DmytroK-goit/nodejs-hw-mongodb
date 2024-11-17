import express from 'express';
import cors from 'cors';
import { Contact } from './services/contact.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { env } from '../src/utils/env.js';

const app = express();
app.use(cors());

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});
app.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact === null) {
    return res.status(404).send({ status: 404, message: 'Contact not found' });
  }
  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
  console.log(contact);
});

app.use((req, res, next) => {
  res.status(404).send({ status: 404, message: 'Not found' });
});
app.use((error, req, res, next) => {
  res.status(500).send({ status: 500, message: 'Internal server error' });
});

export async function setupServer() {
  try {
    await initMongoConnection();
    const PORT = env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error while starting the server:', error);
  }
}
