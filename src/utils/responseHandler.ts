/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export default class ResponseHandler {
  static ErrorResponse(
    res: Response,
    statusCode: number,
    status: boolean,
    message = '',
  ) {
    return res.status(statusCode).json({ message, status });
  }

  static JoiErrorResponse(
    res: Response,
    statusCode: number,
    status: boolean,
    error: any,
    message: string,
  ) {
    return res.status(statusCode).json({ status, message, error });
  }

  static SuccessResponse(
    res: Response,
    statusCode: number,
    status: boolean,
    message = '',
    data: any,
  ) {
    return res.status(statusCode).json({ message, status, data });
  }

  static ServerErrorResponse(res: Response) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', status: false });
  }
}
