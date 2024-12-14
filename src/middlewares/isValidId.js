import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad Request, ID is not valid');
  }

  next();
};
