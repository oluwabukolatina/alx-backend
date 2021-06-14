import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as secret from '../../../config/secrets';

const Jwt = {
  createToken(id: number) {
    return jwt.sign({ id }, secret.JWT_SECRET, {
      expiresIn: secret.JWT_EXPIRY,
    });
  },
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },
  async comparePassword(password: string, hashed: string) {
    return bcrypt.compare(password, hashed);
  },
};

export default Jwt;
