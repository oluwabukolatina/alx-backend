import express from 'express';
import morgan from 'morgan';

import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerDocument from '../swagger.json';
import AuthRoutes from './modules/auth/route/auth.route';

dotenv.config();

class App {
  public app: express.Application;

  public authRoutes: AuthRoutes = new AuthRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.authRoutes.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.get('/', (req, res) => res.send('Hello! Welcome!'));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  private config = (): void => {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  };
}

export default new App().app;
