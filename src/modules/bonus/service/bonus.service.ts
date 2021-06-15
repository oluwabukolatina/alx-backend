import Bonus from '../../../db/models/bonus';

class BonusService {
  public static async create(data: { userId: number; serviceId: number }) {
    try {
      return await Bonus.create(data);
    } catch (error) {
      return error;
    }
  }

  public static async checkIfUsedByUser(data: {
    serviceId: number;
    userId: number;
  }) {
    try {
      return await Bonus.findAll({ where: data });
    } catch (e) {
      return e;
    }
  }
}
export default BonusService;
