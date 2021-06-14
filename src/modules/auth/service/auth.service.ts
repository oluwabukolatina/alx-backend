import User from '../../../database/models/user.model';

class AuthService {
  public static async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    try {
      return await User.create(data);
    } catch (e) {
      return e;
    }
  }
}
export default AuthService;
