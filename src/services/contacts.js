import Contact from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
