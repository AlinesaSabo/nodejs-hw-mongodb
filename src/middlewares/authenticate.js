import createHttpError from 'http-errors';

import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || !accessToken) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user;

  next();
};
