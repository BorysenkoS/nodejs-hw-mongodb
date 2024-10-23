import Contact from '../db/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const createContact = async (contact) => {
  const createContact = await Contact.create(contact);
  return createContact;
};

export const deleteContact = async (id) => {
  const deleteContact = await Contact.findByIdAndDelete(id);
  return deleteContact;
};

export const updateContact = async (id, contact) => {
  const updateContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
  return updateContact;
};
