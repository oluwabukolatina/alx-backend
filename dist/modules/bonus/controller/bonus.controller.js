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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode = __importStar(require("../../../utils/status-codes/http-status-codes"));
const responseHandler_1 = __importDefault(require("../../../utils/responseHandler"));
const bonus_service_1 = __importDefault(require("../service/bonus.service"));
class BonusController {
    constructor() {
        this.redeemBonus = (request, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bonus = yield bonus_service_1.default.create({
                    userId: Number(request.user.id),
                    serviceId: Number(request.params.serviceId),
                });
                if (!bonus)
                    responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'Please try again');
                return responseHandler_1.default.SuccessResponse(res, statusCode.HTTP_CREATED, 'Bonus Activated', {
                    bonus: {
                        id: bonus.id,
                        serviceId: bonus.serviceId,
                        userId: bonus.userId,
                        createdAt: bonus.createdAt,
                    },
                });
            }
            catch (error) {
                return responseHandler_1.default.ServerErrorResponse(res);
            }
        });
    }
}
exports.default = BonusController;
//# sourceMappingURL=bonus.controller.js.map