import { Contact } from '../services/contact.js';

export async function getContacts({ page, perPage }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();
  const [total, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery.skip(skip).limit(perPage),
  ]);
  const totalPage = Math.ceil(total / perPage);
  return {
    contacts,
    page,
    perPage,
    totalItems: total,
    totalPage,
    // hasPreviousPage: page > 1,
    // hasNextPage: page < totalPages,
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
