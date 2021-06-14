import logger from '../../../config/logger';
import User from '../../../db/models/user';

export default class UserServices {
  public static async findUser(data: { email: string }) {
    try {
      return await User.findOne({ where: data });
    } catch (e) {
      return e;
    }
  }
}
