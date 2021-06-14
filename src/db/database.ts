import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { DATABASE_URL } from '../config/secrets';

dotenv.config();
const sequelize = new Sequelize(DATABASE_URL);
export default sequelize;
