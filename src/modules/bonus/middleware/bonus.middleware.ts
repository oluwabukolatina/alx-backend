import { NextFunction, Request, Response } from 'express';
import logger from '../../../config/logger';
import ResponseHandler from '../../../utils/responseHandler';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ServiceService from '../../service/service/service.service';
import BonusService from '../service/bonus.service';

/**
 * to create the service
 * @param body
 * @param res
 * @param next
 */

async function checkIfServiceExists(
  request: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const service = await ServiceService.getOne(
      Number(request.params.serviceId),
    );

    if (!service) {
      return ResponseHandler.ErrorResponse(
        res,
        statusCode.HTTP_NOT_FOUND,
        'This service does not exist',
      );
    }
    return next();
  } catch (error) {
    return ResponseHandler.ServerErrorResponse(res);
  }
}

async function checkIfUserHasRedeemedTheServiceBonus(
  request: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const service = await BonusService.checkIfUsedByUser({
      serviceId: Number(request.params.serviceId),
      userId: Number(request.user.id),
    });
    logger.info(service.length);

    if (service.length > 0) {
      return ResponseHandler.ErrorResponse(
        res,
        statusCode.HTTP_BAD_REQUEST,
        'You can not re-activate a bonus you have previously',
      );
    }
    return next();
  } catch (error) {
    return ResponseHandler.ServerErrorResponse(res);
  }
}

export default {
  checkIfServiceExists,
  checkIfUserHasRedeemedTheServiceBonus,
};
