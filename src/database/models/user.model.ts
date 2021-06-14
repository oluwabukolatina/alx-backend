import { DataTypes } from 'sequelize';
import sequelize from '../database';

const User = sequelize.define('users', {
  firstName: {
    type: DataTypes.STRING,

    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,

    allowNull: false,
  },
});

export default User;
