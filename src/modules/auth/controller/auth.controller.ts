import { Request, Response } from 'express';
import * as statusCode from '../../../utils/status-codes/http-status-codes';
import ResponseHandler from '../../../utils/responseHandler';
import AuthService from '../service/auth.service';
import Jwt from '../utils/jwt';
import UserHelpers from '../../../helpers/shared/user.helper';

class AuthController {
  public registerUser = async ({ body }: Request, res: Response) => {
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

  public loginUser = async ({ body }: Request, res: Response) => {
    try {
      const existingUser = await UserHelpers.findUser({ email: body.email });
      /**
       * check password matches
       */
      const compare = await Jwt.comparePassword(
        body.password,
        existingUser.password,
      );

      if (!compare) {
        return ResponseHandler.ErrorResponse(
          res,
          statusCode.HTTP_FORBIDDEN,
          'Incorrect Credentials',
        );
      }
      const token = await Jwt.createToken(existingUser.id);
      return ResponseHandler.SuccessResponse(
        res,
        statusCode.HTTP_OK,
        'Log in successful',
        {
          user: { id: existingUser.id, email: existingUser.email, token },
        },
      );
    } catch (error) {
      return ResponseHandler.ServerErrorResponse(res);
    }
  };
}
export default AuthController;
