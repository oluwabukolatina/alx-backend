import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

const EmailTemplates = {
  generateResetEmail(link: string) {
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs
        .readFileSync(path.join(__dirname, '/email-for-password-reset.html'))
        .toString('utf-8'),
      {
        link,
      },
    );
  },
  generateWelcomeEmail(name: string, url: string) {
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs
        .readFileSync(path.join(__dirname, '/welcome-email.html'))
        .toString('utf-8'),
      { name, url },
    );
  },
  generateNewUserEmail(name: string, email: string, phoneNumber: string) {
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs
        .readFileSync(path.join(__dirname, '/new-auth-notification-email.html'))
        .toString('utf-8'),
      { name, email, phoneNumber },
    );
  },

  generateFailedSignUpEmailToAdmin(
    name: string,
    email: string,
    phoneNumber: string,
  ) {
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs
        .readFileSync(path.join(__dirname, '/failed-auth-signup.html'))
        .toString('utf-8'),
      { name, email, phoneNumber },
    );
  },
};
export default EmailTemplates;
