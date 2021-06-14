import { Application } from 'express';
import AuthController from '../controller/auth.controller';

class AuthRoutes {
  public authController: AuthController = new AuthController();

  /**
   *
   * @param app validation todo
   */
  public routes = (app: Application): void => {
    app.route('/api/v1/alx/auth/register').post(this.authController.register);
  };
}
export default AuthRoutes;
