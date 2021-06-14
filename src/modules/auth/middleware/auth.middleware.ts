import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import logger from '../../../config/logger';
import UserHelpers from '../../../helpers/shared/user.helper';
import ResponseHandler from '../../../utils/responseHandler';
import { HTTP_BAD_REQUEST } from '../../../utils/status-codes/http-status-codes';

/**
 * to sign the user
 * @param body
 * @param res
 * @param next
 */

async function validateRegister(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(body, {
    stripUnknown: true,
  });
  if (error)
    return ResponseHandler.JoiErrorResponse(
      res,
      HTTP_BAD_REQUEST,
      error.details.map(({ message }: any) => ({
        message: message.replace(/['"]/g, ''),
      })),
      'Unable to register',
    );
  return next();
}
async function validateLogin(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(body, {
    stripUnknown: true,
  });
  if (error)
    return ResponseHandler.JoiErrorResponse(
      res,
      HTTP_BAD_REQUEST,
      error.details.map(({ message }: any) => ({
        message: message.replace(/['"]/g, ''),
      })),
      'Unable to login',
    );
  return next();
}
/**
 *
 * @param param0 check if the user has previously registered.
 * @param res
 * @param next
 * @returns
 */
async function checkIfUser(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await UserHelpers.findUser({ email: body.email });
    if (!user) {
      return ResponseHandler.ErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        'You have entered an invalid email or password',
      );
    }
    return next();
  } catch (e) {
    return ResponseHandler.ErrorResponse(
      res,
      HTTP_BAD_REQUEST,
      'Internal server error',
    );
  }
}
async function checkIfAnUnregisteredUser(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await UserHelpers.findUser({ email: body.email });

    if (user) {
      return ResponseHandler.ErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        'You have entered an invalid email or password',
      );
    }
    return next();
  } catch (e) {
    return ResponseHandler.ErrorResponse(
      res,
      HTTP_BAD_REQUEST,
      'Internal server error',
    );
  }
}

export default {
  validateRegister,
  validateLogin,
  checkIfUser,
  checkIfAnUnregisteredUser,
};
