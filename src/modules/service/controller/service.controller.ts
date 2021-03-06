import { Request, Response } from 'express';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/responseHandler';
import ServiceService from '../service/service.service';
import ServiceHelper from '../utils/service.helper';

class ServiceController {
  public createService = async ({ body }: Request, res: Response) => {
    try {
      const service = await ServiceService.create({
        name: body.name,
        description: body.description,
        promoCode: ServiceHelper.generatePromoCode(5),
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
            promoCode: service.promoCode,
            createdAt: service.createdAt,
          },
        },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };

  public getServices = async (request: Request, res: Response) => {
    try {
      const services = await ServiceService.get();
      if (!services)
        ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,
          'Please try again',
        );

      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_OK,
        'Fetched Services',
        {
          services,
        },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };

  /**
   * search for service
   */
  public searchService = async ({ body }: Request, res: Response) => {
    try {
      const services = await ServiceService.search(body.search);
      if (!services)
        return ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,
          'Unable to search',
        );
      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_OK,
        `Searched For Services with query : ${body.search}`,
        { services },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default ServiceController;
