import { Request, Response } from 'express';
import { HTTP_CREATED } from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/responseHandler';
import AuthService from '../service/auth.service';

class AuthController {
  public register = async ({ body }: Request, res: Response) => {
    try {
      const user = await AuthService.create({
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        firstName: body.firstName,
      });

      // logger.info(user, 'user created');
      if (!user) ResponseHandler.ErrorResponse(res, 400, false, 'try again');
      return ResponseHandler.SuccessResponse(
        res,
        HTTP_CREATED,
        true,
        'User Created',
        { user },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default AuthController;
