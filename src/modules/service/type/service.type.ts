import { Model } from 'sequelize';

export interface ServiceInstance extends Model {
  readonly id: number;
  name: string;
}
