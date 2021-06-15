/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export default class ResponseHandler {
  static ErrorResponse(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({ message, status: false });
  }

  static JoiErrorResponse(
    res: Response,
    statusCode: number,
    error: any,
    message: string,
  ) {
    return res.status(statusCode).json({ status: false, message, error });
  }

  static SuccessResponse(
    res: Response,
    statusCode: number,
    message = '',
    data: any,
  ) {
    return res.status(statusCode).json({ message, status: true, data });
  }

  static ServerErrorResponse(res: Response) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', status: false });
  }
}
