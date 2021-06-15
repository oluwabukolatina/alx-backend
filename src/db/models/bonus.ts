import { DataTypes } from 'sequelize';
import { BonusInstance } from '../../modules/bonus/type/bonus.type';
import sequelize from '../database';

const Bonus = sequelize.define<BonusInstance>(
  'Bonus',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
    },
    serviceId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'Bonus',
    tableName: 'Bonuses',
  },
);
export default Bonus;
