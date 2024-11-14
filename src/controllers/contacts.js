import createError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIDController(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;
  const contact = await getContactById(id, userId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  // const contact = {
  //   name: req.body.name,
  //   phoneNumber: req.body.phoneNumber,
  //   email: req.body.email,
  //   isFavourite: req.body.isFavorite,
  //   contactType: req.body.contactType,
  //   userId: req.user.id,
  //   photo: photoUrl,
  // };

  const contact = await createContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });
  return res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const result = await deleteContact(id, userId);
  if (result === null) {
    throw createError(404, 'Contact not found');
  }

  return res.status(204).end();
};

export const patchContactController = async (req, res, next) => {
  const userId = req.user._id;

  const { id } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(id, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};
