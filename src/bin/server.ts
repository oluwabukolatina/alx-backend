import app from '../app';
import logger from '../config/logger';

if (!process.env.PORT) {
  process.exit(1);
}
const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(APP_PORT, () => {
  logger.info(`App is running at ${APP_PORT}`);
});
