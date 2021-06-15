import { Model } from 'sequelize';

export interface BonusInstance extends Model {
  readonly id: number;
  name: string;
  userId: number;
  serviceId: number;
}
