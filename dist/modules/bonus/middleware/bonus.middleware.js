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
const logger_1 = __importDefault(require("../../../config/logger"));
const responseHandler_1 = __importDefault(require("../../../utils/responseHandler"));
const statusCode = __importStar(require("../../../utils/status-codes/http-status-codes"));
const service_service_1 = __importDefault(require("../../service/service/service.service"));
const bonus_service_1 = __importDefault(require("../service/bonus.service"));
/**
 * to create the service
 * @param body
 * @param res
 * @param next
 */
function checkIfServiceExists(request, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = yield service_service_1.default.getOne(Number(request.params.serviceId));
            if (!service) {
                return responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_NOT_FOUND, 'This service does not exist');
            }
            return next();
        }
        catch (error) {
            return responseHandler_1.default.ServerErrorResponse(res);
        }
    });
}
function checkIfUserHasRedeemedTheServiceBonus(request, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = yield bonus_service_1.default.checkIfUsedByUser({
                serviceId: Number(request.params.serviceId),
                userId: Number(request.user.id),
            });
            logger_1.default.info(service.length);
            if (service.length > 0) {
                return responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'You can not re-activate a bonus you have previously');
            }
            return next();
        }
        catch (error) {
            return responseHandler_1.default.ServerErrorResponse(res);
        }
    });
}
exports.default = {
    checkIfServiceExists,
    checkIfUserHasRedeemedTheServiceBonus,
};
//# sourceMappingURL=bonus.middleware.js.map