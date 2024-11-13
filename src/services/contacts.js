import mongoose from 'mongoose';
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

  const contactsQuery = Contact.find({ userId });

  const contactsCount = await Contact.countDocuments({ userId });

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
  return await Contact.findOne({ _id: id, userId });
};

export const createContact = async (contact) => {
  const createContact = await Contact.create(contact);
  return createContact;
};

export const deleteContact = async (id, userId) => {
  const deleteContact = await Contact.findOneAndDelete({ _id: id, userId });
  return deleteContact;
};

// export const updateContact = async (id, contact, userId) => {
//   const updateContact = await Contact.findOneAndUpdate(
//     { _id: id, userId },
//     contact,
//     {
//       new: true,
//     },
//   );
//   return updateContact;
// };

export const updateContact = async (id, userId, contact) => {
  const updateContact = await Contact.findOneAndUpdate(
    { _id: id, userId },
    contact,
    { new: true },
  );
  return updateContact;
};
