import Contact from '../db/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactByID = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};
