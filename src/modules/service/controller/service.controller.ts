import { Request, Response } from 'express';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/responseHandler';
import ServiceService from '../service/service.service';

class ServiceController {
  public createService = async ({ body }: Request, res: Response) => {
    try {
      const service = await ServiceService.create({
        name: body.name,
      });
      if (!service)
        ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,
          'Please try again',
        );

      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_CREATED,
        'Service Created',
        {
          service: {
            id: service.id,
            name: service.name,
            description: service.description,
            createdAt: service.createdAt,
          },
        },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default ServiceController;
