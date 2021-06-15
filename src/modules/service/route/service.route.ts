import { Application } from 'express';
import auth from '../../../middleware/auth.middleware';
import URLS from '../../../utils/urls';
import ServiceController from '../controller/service.controller';
import serviceMiddleware from '../middleware/service.middleware';

class ServiceRoutes {
  public serviceController: ServiceController = new ServiceController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.SERVICE_URL}`)
      .post(
        auth,
        serviceMiddleware.validateCreateService,
        this.serviceController.createService,
      );
    app
      .route(`${URLS.SERVICE_URL}`)
      .get(auth, this.serviceController.getServices);
    app
      .route(`${URLS.SERVICE_URL}/search`)
      .post(auth, this.serviceController.searchService);
  };
}
export default ServiceRoutes;
