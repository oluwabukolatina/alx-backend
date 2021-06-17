"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = __importDefault(require("../../../middleware/auth.middleware"));
const urls_1 = __importDefault(require("../../../utils/urls"));
const service_controller_1 = __importDefault(require("../controller/service.controller"));
const service_middleware_1 = __importDefault(require("../middleware/service.middleware"));
class ServiceRoutes {
    constructor() {
        this.serviceController = new service_controller_1.default();
        this.routes = (app) => {
            app
                .route(`${urls_1.default.SERVICE_URL}`)
                .post(auth_middleware_1.default, service_middleware_1.default.validateCreateService, this.serviceController.createService);
            app
                .route(`${urls_1.default.SERVICE_URL}`)
                .get(auth_middleware_1.default, this.serviceController.getServices);
            app
                .route(`${urls_1.default.SERVICE_URL}/search`)
                .post(auth_middleware_1.default, this.serviceController.searchService);
        };
    }
}
exports.default = ServiceRoutes;
//# sourceMappingURL=service.route.js.map