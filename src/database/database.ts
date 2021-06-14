import { Sequelize } from 'sequelize';
import logger from '../config/logger';
import { APP_DB } from '../config/secrets';

const sequelize = new Sequelize(APP_DB);
sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });
export default sequelize;
