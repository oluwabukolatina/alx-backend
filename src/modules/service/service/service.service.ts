import Sequelize from 'sequelize';
import Service from '../../../db/models/service';

const { Op } = Sequelize;

class ServiceService {
  public static async create(data: {
    name: string;
    description: string;
    promoCode: string;
  }) {
    try {
      return await Service.create(data);
    } catch (error) {
      return error;
    }
  }

  public static async get() {
    try {
      return await Service.findAll();
    } catch (error) {
      return error;
    }
  }

  public static async getOne(id: number) {
    try {
      return await Service.findByPk(id);
    } catch (error) {
      return error;
    }
  }

  /**
   * search
   */
  public static async search(q: string) {
    try {
      return await Service.findAll({
        where: {
          description: { [Op.iLike]: `%${q}%` },
        },
      });
    } catch (error) {
      return error;
    }
  }
}
export default ServiceService;
