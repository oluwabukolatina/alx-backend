import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
  if (!secret) {
    logger.error(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}
export const ENVIRONMENT = process.env.NODE_ENV;
export const DATABASE_URL = throwIfUndefined(
  process.env.DATABASE_URL,
  'DATABASE_URL',
);
export const JWT_SECRET = throwIfUndefined(
  process.env.JWT_SECRET,
  'JWT_SECRET',
);
export const JWT_EXPIRY = throwIfUndefined(
  process.env.JWT_EXPIRY,
  'JWT_EXPIRY',
);
