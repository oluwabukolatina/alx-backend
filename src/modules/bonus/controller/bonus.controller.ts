import { Request, Response } from 'express';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/responseHandler';
import BonusService from '../service/bonus.service';

class BonusController {
  public redeemBonus = async (request: Request, res: Response) => {
    try {
      const bonus = await BonusService.create({
        userId: Number(request.user.id),
        serviceId: Number(request.params.serviceId),
      });
      if (!bonus)
        ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,
          'Please try again',
        );

      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_CREATED,
        'Bonus Activated',
        {
          bonus: {
            id: bonus.id,
            serviceId: bonus.serviceId,
            userId: bonus.userId,
            createdAt: bonus.createdAt,
          },
        },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default BonusController;
