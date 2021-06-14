import { Request, Response } from 'express';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/responseHandler';
import AuthService from '../service/auth.service';
import Jwt from '../utils/jwt';

class AuthController {
  public register = async ({ body }: Request, res: Response) => {
    try {
      const user = await AuthService.create({
        email: body.email,
        password: await Jwt.hashPassword(body.password),
      });
      if (!user)
        ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_BAD_REQUEST,

          'Please try again',
        );

      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_CREATED,
        'User Created',
        { user: { email: user.email, id: user.id, createdAt: user.createdAt } },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default AuthController;
