"use strict";
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
const joi_1 = __importDefault(require("joi"));
const responseHandler_1 = __importDefault(require("../../../utils/responseHandler"));
const http_status_codes_1 = require("../../../utils/status-codes/http-status-codes");
/**
 * to create the service
 * @param body
 * @param res
 * @param next
 */
function validateCreateService({ body }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
        });
        const { error } = schema.validate(body, {
            stripUnknown: true,
        });
        if (error)
            return responseHandler_1.default.JoiErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, error.details.map(({ message }) => ({
                message: message.replace(/['"]/g, ''),
            })), 'Unable to create Service');
        return next();
    });
}
exports.default = {
    validateCreateService,
};
//# sourceMappingURL=service.middleware.js.map