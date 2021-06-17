"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = __importDefault(require("../../../middleware/auth.middleware"));
const urls_1 = __importDefault(require("../../../utils/urls"));
const bonus_controller_1 = __importDefault(require("../controller/bonus.controller"));
const bonus_middleware_1 = __importDefault(require("../middleware/bonus.middleware"));
class BonusRoutes {
    constructor() {
        this.bonusController = new bonus_controller_1.default();
        this.routes = (app) => {
            app
                .route(`${urls_1.default.BONUS_URL}/:serviceId`)
                .post(auth_middleware_1.default, bonus_middleware_1.default.checkIfServiceExists, bonus_middleware_1.default.checkIfUserHasRedeemedTheServiceBonus, this.bonusController.redeemBonus);
        };
    }
}
exports.default = BonusRoutes;
//# sourceMappingURL=bonus.route.js.map