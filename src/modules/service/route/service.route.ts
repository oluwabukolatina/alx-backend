import { Application } from 'express';
import URLS from '../../../utils/urls';
import ServiceController from '../controller/service.controller';
import serviceMiddleware from '../middleware/service.middleware';

class ServiceRoutes {
  public serviceController: ServiceController = new ServiceController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.SERVICE_URL}`)
      .post(
        serviceMiddleware.validateCreateService,
        this.serviceController.createService,
      );
  };
}
export default ServiceRoutes;
