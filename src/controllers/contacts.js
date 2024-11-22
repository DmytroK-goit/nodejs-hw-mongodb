import createHttpError from 'http-errors';

import { getContacts } from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getContacts();

  res.send({ status: 200, data: contacts });
}
