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
const service_service_1 = __importDefault(require("../service/service.service"));
const service_helper_1 = __importDefault(require("../utils/service.helper"));
class ServiceController {
    constructor() {
        this.createService = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield service_service_1.default.create({
                    name: body.name,
                    description: body.description,
                    promoCode: service_helper_1.default.generatePromoCode(5),
                });
                if (!service)
                    responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'Please try again');
                return responseHandler_1.default.SuccessResponse(res, statusCode.HTTP_CREATED, 'Service Created', {
                    service: {
                        id: service.id,
                        name: service.name,
                        description: service.description,
                        promoCode: service.promoCode,
                        createdAt: service.createdAt,
                    },
                });
            }
            catch (error) {
                return responseHandler_1.default.ServerErrorResponse(res);
            }
        });
        this.getServices = (request, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield service_service_1.default.get();
                if (!services)
                    responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'Please try again');
                return responseHandler_1.default.SuccessResponse(res, statusCode.HTTP_OK, 'Fetched Services', {
                    services,
                });
            }
            catch (error) {
                return responseHandler_1.default.ServerErrorResponse(res);
            }
        });
        /**
         * search for service
         */
        this.searchService = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield service_service_1.default.search(body.search);
                if (services)
                    responseHandler_1.default.SuccessResponse(res, statusCode.HTTP_OK, `Searched For Services with query : ${body.search}`, { services });
                return responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'Unable to search');
            }
            catch (error) {
                return responseHandler_1.default.ServerErrorResponse(res);
            }
        });
    }
}
exports.default = ServiceController;
//# sourceMappingURL=service.controller.js.map