"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_DIALECT = exports.DATABASE_HOST = exports.DATABASE_NAME = exports.DATABASE_PASSWORD = exports.DATABASE_USERNAME = exports.JWT_EXPIRY = exports.JWT_SECRET = exports.DATABASE_URL = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
function throwIfUndefined(secret, name) {
    if (!secret) {
        logger_1.default.error(`${name} must not be undefined`);
        return process.exit(1);
    }
    return secret;
}
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.DATABASE_URL = throwIfUndefined(process.env.DATABASE_URL, 'DATABASE_URL');
exports.JWT_SECRET = throwIfUndefined(process.env.JWT_SECRET, 'JWT_SECRET');
exports.JWT_EXPIRY = throwIfUndefined(process.env.JWT_EXPIRY, 'JWT_EXPIRY');
exports.DATABASE_USERNAME = throwIfUndefined(process.env.DATABASE_USERNAME, 'DATABASE_USERNAME');
exports.DATABASE_PASSWORD = throwIfUndefined(process.env.DATABASE_PASSWORD, 'DATABASE_PASSWORD');
exports.DATABASE_NAME = throwIfUndefined(process.env.DATABASE_NAME, 'DATABASE_NAME');
exports.DATABASE_HOST = throwIfUndefined(process.env.DATABASE_HOST, 'DATABASE_HOST');
exports.DATABASE_DIALECT = throwIfUndefined(process.env.DATABASE_DIALECT, 'DATABASE_DIALECT');
//# sourceMappingURL=secrets.js.map