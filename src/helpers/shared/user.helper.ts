import UserServices from '../../modules/user/service/user.service';
const UserHelpers = {
  async findUser(data: { email: string }) {
    try {
      return await UserServices.findUser(data);
    } catch (e) {
      return e;
    }
  },
};
export default UserHelpers;
