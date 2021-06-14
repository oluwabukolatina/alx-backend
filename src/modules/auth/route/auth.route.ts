import { Application } from 'express';
import URLS from '../../../utils/urls';
import AuthController from '../controller/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

class AuthRoutes {
  public authController: AuthController = new AuthController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.AUTH_URL}/register`)
      .post(
        authMiddleware.validateRegister,
        authMiddleware.checkIfAnUnregisteredUser,
        this.authController.registerUser,
      );
    app
      .route(`${URLS.AUTH_URL}/login`)
      .post(
        authMiddleware.validateLogin,
        authMiddleware.checkIfUser,
        this.authController.loginUser,
      );
  };
}
export default AuthRoutes;
