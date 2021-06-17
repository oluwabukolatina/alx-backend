"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./modules/auth/route/auth.route"));
const service_route_1 = __importDefault(require("./modules/service/route/service.route"));
const bonus_route_1 = __importDefault(require("./modules/bonus/route/bonus.route"));
dotenv.config();
class App {
    constructor() {
        this.authRoutes = new auth_route_1.default();
        this.serviceRoutes = new service_route_1.default();
        this.bonusRoutes = new bonus_route_1.default();
        this.config = () => {
            this.app.use(helmet_1.default());
            this.app.use(cors_1.default());
            this.app.use(express_1.default.json());
            this.app.use(morgan_1.default('dev'));
        };
        this.app = express_1.default();
        this.config();
        this.authRoutes.routes(this.app);
        this.serviceRoutes.routes(this.app);
        this.bonusRoutes.routes(this.app);
        this.app.disable('x-powered-by');
        this.app.get('/', (req, res) => res.send('Hello! Welcome!'));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map