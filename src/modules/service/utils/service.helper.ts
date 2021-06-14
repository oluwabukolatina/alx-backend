import crypto from 'crypto';

const ServiceHelper = {
  generatePromoCode(length: number) {
    return crypto.randomBytes(length).toString('hex');
  },
};

export default ServiceHelper;
