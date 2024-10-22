import Contact from '../db/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

export const createContact = async (contact) => {
  const createContact = await Contact.create(contact);
  return createContact;
};

export const deleteContact = async (id) => {
  const deleteContact = await Contact.findByIdAndDelete(id);
  return deleteContact;
};
