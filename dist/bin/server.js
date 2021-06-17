"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const logger_1 = __importDefault(require("../config/logger"));
if (!process.env.PORT) {
    process.exit(1);
}
const APP_PORT = parseInt(process.env.PORT, 10) || 3000;
app_1.default.listen(APP_PORT, () => {
    logger_1.default.info(`App is running at ${APP_PORT}`);
});
//# sourceMappingURL=server.js.map