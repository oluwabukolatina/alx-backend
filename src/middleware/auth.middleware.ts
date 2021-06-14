import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import ResponseHandler from '../utils/responseHandler';
import * as statusCode from '../utils/status-codes/http-status-codes';
import { JWT_SECRET } from '../config/secrets';

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('X-Auth-Token');
  if (!token)
    return ResponseHandler.ErrorResponse(
      res,
      statusCode.HTTP_UNAUTHORIZED,
      'No Token Found. Authorization Denied',
    );

  try {
    /**
     * add uder fromm the payload
     */
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (e) {
    return ResponseHandler.ErrorResponse(
      res,
      statusCode.HTTP_BAD_REQUEST,
      'Token Is Not Valid',
    );
  }
}
export default auth;
