"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urls_1 = __importDefault(require("../../../utils/urls"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
class AuthRoutes {
    constructor() {
        this.authController = new auth_controller_1.default();
        this.routes = (app) => {
            app
                .route(`${urls_1.default.AUTH_URL}/register`)
                .post(auth_middleware_1.default.validateRegister, auth_middleware_1.default.checkIfAnUnregisteredUser, this.authController.registerUser);
            app
                .route(`${urls_1.default.AUTH_URL}/login`)
                .post(auth_middleware_1.default.validateLogin, auth_middleware_1.default.checkIfUser, this.authController.loginUser);
        };
    }
}
exports.default = AuthRoutes;
//# sourceMappingURL=auth.route.js.map