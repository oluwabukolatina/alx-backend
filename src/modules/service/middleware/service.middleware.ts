import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ResponseHandler from '../../../utils/responseHandler';
import { HTTP_BAD_REQUEST } from '../../../utils/status-codes/http-status-codes';

/**
 * to create the service
 * @param body
 * @param res
 * @param next
 */

async function validateCreateService(
  { body }: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
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
      'Unable to create Service',
    );
  return next();
}

export default {
  validateCreateService,
};
