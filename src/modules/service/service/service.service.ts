import Service from '../../../db/models/service';

class ServiceService {
  public static async create(data: { name: string }) {
    try {
      return await Service.create(data);
    } catch (error) {
      return error;
    }
  }
}
export default ServiceService;
