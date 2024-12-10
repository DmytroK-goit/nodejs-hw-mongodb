import { Contact } from '../models/contact.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const { sortBy: validSortBy, sortOrder: validSortOrder } = parseSortParams({
    sortBy,
    sortOrder,
  });

  const totalItems = await Contact.countDocuments({ userId });

  const contacts = await Contact.find({ userId })
    .sort({ [validSortBy]: validSortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(perPage);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}
export function getContact(contactId, userId) {
  return Contact.findOne({ _id: contactId, userId });
}
export function createContact(contact) {
  return Contact.create(contact);
}
export function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({ _id: contactId, userId });
}
export function updContact(contactId, contact, userId) {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });
}
