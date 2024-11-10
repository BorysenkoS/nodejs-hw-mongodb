import Contact from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  contactsQuery.where('userId').equals(userId);

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

export const getContactById = async (id, userId) => {
  return await Contact.findById(id, userId);
};

export const createContact = async (contact) => {
  const createContact = await Contact.create(contact);
  return createContact;
};

export const deleteContact = async (id, userId) => {
  const deleteContact = await Contact.findByIdAndDelete(id, userId);
  return deleteContact;
};

export const updateContact = async (id, contact, userId) => {
  const updateContact = await Contact.findByIdAndUpdate(id, contact, userId, {
    new: true,
  });
  return updateContact;
};
