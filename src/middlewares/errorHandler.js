import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res
      .status(error.statusCode)
      .send({ status: error.statusCode, message: error.message });
  }
  res.status(500).json({
    message: 'Something went wrong',
    error: error.message,
  });
};
