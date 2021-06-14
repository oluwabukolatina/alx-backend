import { Model } from 'sequelize';

export interface UserInstance extends Model {
  readonly id: number;
  email: string;
  password: string;
}
