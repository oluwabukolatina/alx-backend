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
const auth_service_1 = __importDefault(require("../service/auth.service"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const user_helper_1 = __importDefault(require("../../../helpers/shared/user.helper"));
class AuthController {
    constructor() {
        this.registerUser = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.default.create({
                    email: body.email,
                    password: yield jwt_1.default.hashPassword(body.password),
                });
                const token = yield jwt_1.default.createToken(user.id);
                if (!user)
                    responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'Please try again');
                return responseHandler_1.default.SuccessResponse(res, statusCode.HTTP_CREATED, 'User Created', {
                    user: {
                        id: user.id,
                        email: user.email,
                        token,
                        createdAt: user.createdAt,
                    },
                });
            }
            catch (error) {
                return responseHandler_1.default.ServerErrorResponse(res);
            }
        });
        this.loginUser = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_helper_1.default.findUser({ email: body.email });
                /**
                 * check password matches
                 */
                const compare = yield jwt_1.default.comparePassword(body.password, existingUser.password);
                if (!compare) {
                    return responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_FORBIDDEN, 'Incorrect Credentials');
                }
                const token = yield jwt_1.default.createToken(existingUser.id);
                return responseHandler_1.default.SuccessResponse(res, statusCode.HTTP_OK, 'Log in successful', {
                    user: { id: existingUser.id, email: existingUser.email, token },
                });
            }
            catch (error) {
                return responseHandler_1.default.ServerErrorResponse(res);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map