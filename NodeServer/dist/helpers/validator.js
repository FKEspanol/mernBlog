"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomClientError = void 0;
class CustomClientError extends Error {
    constructor(errorDetails, statusCode) {
        super("CustomClientError has occured");
        this.errorResponse = {
            statusCode,
            message: this.message,
            details: {
                errorDetails,
            }
        };
    }
}
exports.CustomClientError = CustomClientError;
