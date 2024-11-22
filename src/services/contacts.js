import { Contact } from '../services/contact.js';

export function getContacts() {
  return Contact.find();
}
