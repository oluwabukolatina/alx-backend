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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const statusCode = __importStar(require("../utils/status-codes/http-status-codes"));
const secrets_1 = require("../config/secrets");
function auth(req, res, next) {
    const token = req.header('X-Auth-Token');
    if (!token)
        return responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_UNAUTHORIZED, 'No Token Found. Authorization Denied');
    try {
        /**
         * add uder fromm the payload
         */
        req.user = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
        return next();
    }
    catch (e) {
        return responseHandler_1.default.ErrorResponse(res, statusCode.HTTP_BAD_REQUEST, 'Token Is Not Valid');
    }
}
exports.default = auth;
//# sourceMappingURL=auth.middleware.js.map