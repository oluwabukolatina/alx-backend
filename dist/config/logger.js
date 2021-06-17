"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const secrets_1 = require("./secrets");
const { json, prettyPrint, splat, simple, timestamp, printf, cli, combine, colorize, label, } = winston_1.default.format;
const { transports, createLogger } = winston_1.default;
const format = cli({
    colors: {
        info: 'blue',
        error: 'red',
        warn: 'yellow',
        http: 'magenta',
        debug: 'white',
    },
});
const level = () => {
    return secrets_1.ENVIRONMENT === 'development' ? 'debug' : 'info';
};
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const options = {
    levels,
    level: level(),
    transports: [
        new transports.Console({
            level: secrets_1.ENVIRONMENT === 'production' ? 'error' : 'debug',
            format,
        }),
        new transports.File({ filename: 'logs/debug.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
    format: combine(colorize({ all: true }), label({
        label: 'Label🏷️',
    }), json(), prettyPrint(), splat(), simple(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), printf((info) => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`)),
};
const logger = createLogger(options);
if (secrets_1.ENVIRONMENT !== 'production') {
    logger.debug('Logging initialized at debug level');
}
exports.default = logger;
//# sourceMappingURL=logger.js.map