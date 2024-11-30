import { Contact } from '../services/contact.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContacts({ page, perPage, sortBy, sortOrder }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const { sortBy: validSortBy, sortOrder: validSortOrder } = parseSortParams({
    sortBy,
    sortOrder,
  });
  const contactQuery = Contact.find();
  const [total, contacts] = await Promise.all([
    Contact.countDocuments(),
    contactQuery
      .sort({ [validSortBy]: validSortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPage = Math.ceil(total / perPage);
  console.log('SortBy:', validSortBy);
  console.log('SortOrder:', validSortOrder);
  return {
    contacts,
    page,
    perPage,
    totalItems: total,
    totalPage,
  };
}
export function getContact(contactId) {
  return Contact.findById(contactId);
}
export function createContact(contact) {
  return Contact.create(contact);
}
export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}
export function updContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
}
