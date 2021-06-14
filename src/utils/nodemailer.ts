import nodemailer from 'nodemailer';
import * as secrets from '../config/secrets';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: secrets.MAIL_TRAP_USER,
    pass: secrets.MAIL_TRAP_PASSWORD,
  },

  secure: false,
});

export default transporter;
