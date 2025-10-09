"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(message, data = null, status = 200, success = true) {
    return { status, success, message, data };
}
function errorResponse(message, data = null, status = 400, success = false) {
    return { status, success, message, data };
}
//# sourceMappingURL=response.utils.js.map