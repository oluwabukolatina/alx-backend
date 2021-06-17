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
const user_helper_1 = __importDefault(require("../../../helpers/shared/user.helper"));
const responseHandler_1 = __importDefault(require("../../../utils/responseHandler"));
const http_status_codes_1 = require("../../../utils/status-codes/http-status-codes");
/**
 * to sign the user
 * @param body
 * @param res
 * @param next
 */
function validateRegister({ body }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
        });
        const { error } = schema.validate(body, {
            stripUnknown: true,
        });
        if (error)
            return responseHandler_1.default.JoiErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, error.details.map(({ message }) => ({
                message: message.replace(/['"]/g, ''),
            })), 'Unable to register');
        return next();
    });
}
function validateLogin({ body }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
        });
        const { error } = schema.validate(body, {
            stripUnknown: true,
        });
        if (error)
            return responseHandler_1.default.JoiErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, error.details.map(({ message }) => ({
                message: message.replace(/['"]/g, ''),
            })), 'Unable to login');
        return next();
    });
}
/**
 *
 * @param param0 check if the user has previously registered.
 * @param res
 * @param next
 * @returns
 */
function checkIfUser({ body }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_helper_1.default.findUser({ email: body.email });
            if (!user) {
                return responseHandler_1.default.ErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, 'You have entered an invalid email or password');
            }
            return next();
        }
        catch (e) {
            return responseHandler_1.default.ErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, 'Internal server error');
        }
    });
}
function checkIfAnUnregisteredUser({ body }, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_helper_1.default.findUser({ email: body.email });
            if (user) {
                return responseHandler_1.default.ErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, 'You have entered an invalid email or password');
            }
            return next();
        }
        catch (e) {
            return responseHandler_1.default.ErrorResponse(res, http_status_codes_1.HTTP_BAD_REQUEST, 'Internal server error');
        }
    });
}
exports.default = {
    validateRegister,
    validateLogin,
    checkIfUser,
    checkIfAnUnregisteredUser,
};
//# sourceMappingURL=auth.middleware.js.map