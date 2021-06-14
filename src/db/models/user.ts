import { DataTypes } from 'sequelize';
import { UserInstance } from '../../modules/user/user.type';
import sequelize from '../database';

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {},
);
export default User;
