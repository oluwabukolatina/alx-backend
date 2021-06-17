"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    static ErrorResponse(res, statusCode, message) {
        return res.status(statusCode).json({ message, status: false });
    }
    static JoiErrorResponse(res, statusCode, error, message) {
        return res.status(statusCode).json({ status: false, message, error });
    }
    static SuccessResponse(res, statusCode, message = '', data) {
        return res.status(statusCode).json({ message, status: true, data });
    }
    static ServerErrorResponse(res) {
        return res
            .status(500)
            .json({ message: 'Internal Server Error', status: false });
    }
}
exports.default = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map