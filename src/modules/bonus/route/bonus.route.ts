import { Application } from 'express';
import auth from '../../../middleware/auth.middleware';
import URLS from '../../../utils/urls';
import BonusController from '../controller/bonus.controller';
import bonusMiddleware from '../middleware/bonus.middleware';

class BonusRoutes {
  public bonusController: BonusController = new BonusController();

  public routes = (app: Application): void => {
    app
      .route(`${URLS.BONUS_URL}/:serviceId`)
      .post(
        auth,
        bonusMiddleware.checkIfServiceExists,
        bonusMiddleware.checkIfUserHasRedeemedTheServiceBonus,
        this.bonusController.redeemBonus,
      );
  };
}
export default BonusRoutes;
