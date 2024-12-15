import * as fs from 'node:fs/promises';
import path from 'node:path';
import createHttpError from 'http-errors';

import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export async function getContactsController(req, res) {
  const { page, perPage, totalPages, hasPreviousPage, hasNextPage } =
    parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contactsResult = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    userId: req.user._id,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contactsResult.contacts,
      page: contactsResult.page,
      perPage: contactsResult.perPage,
      totalItems: contactsResult.totalItems,
      totalPages: contactsResult.totalPages,
      hasPreviousPage: contactsResult.hasPreviousPage,
      hasNextPage: contactsResult.hasNextPage,
    },
  });
}

export async function getContactController(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  const contact = await getContact(id, userId);
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
  let photo = null;
  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'photo', req.file.filename),
      );
      photo = `http://localhost:8080/contacts/photos/${req.file.filename}`;
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo,
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
  const userId = req.user._id;
  const result = await deleteContact(id, userId);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.status(204).send();
}
export async function updContactController(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  let photo = null;
  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const resultPhoto = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      photo = resultPhoto.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'photo', req.file.filename),
      );
      photo = `http://localhost:8080/contacts/photos/${req.file.filename}`;
    }
  }
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    photo,
  };

  const result = await updContact(id, contact, userId);
  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.send({
    status: 200,
    message: 'Contact updated successfully',
    data: result,
  });
}
