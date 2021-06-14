import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import AuthRoutes from './modules/auth/route/auth.route';
import ServiceRoutes from './modules/service/route/service.route';

dotenv.config();

class App {
  public app: express.Application;

  public authRoutes: AuthRoutes = new AuthRoutes();
  public serviceRoutes: ServiceRoutes = new ServiceRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.authRoutes.routes(this.app);
    this.serviceRoutes.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.get('/', (req, res) => res.send('Hello! Welcome!'));
  }

  private config = (): void => {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  };
}

export default new App().app;
