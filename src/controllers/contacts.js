import createHttpError from 'http-errors';

import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { id } = req.params;
  const contact = await getContact(id);
  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
  console.log(contact);
}

export async function createContactController(req, res) {
  console.log(req.body);
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const result = await createContact(contact);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}
export async function deleteContactController(req, res) {
  const { id } = req.params;
  const result = await deleteContact(id);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.send({
    status: 200,
    message: 'Contact delete successfully',
    data: result,
  });
}
export async function updContactController(req, res) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const result = await updContact(id, contact);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.send({
    status: 200,
    message: 'Contact update successfully',
    data: result,
  });
}
