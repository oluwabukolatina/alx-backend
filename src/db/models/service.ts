import { DataTypes } from 'sequelize';
import { ServiceInstance } from '../../modules/service/type/service.type';
import sequelize from '../database';

const Service = sequelize.define<ServiceInstance>(
  'Service',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    promoCode: {
      type: DataTypes.STRING,
    },
  },
  {},
);
export default Service;
