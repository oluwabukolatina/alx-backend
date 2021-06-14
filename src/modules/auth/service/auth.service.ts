import User from '../../../db/models/user';

class AuthService {
  public static async create(data: { email: string; password: string }) {
    try {
      return await User.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default AuthService;
