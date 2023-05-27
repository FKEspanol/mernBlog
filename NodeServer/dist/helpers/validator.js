"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomClientError = void 0;
class CustomClientError extends Error {
    constructor(errorProps, statusCode) {
        super("CustomClientError has occured");
        this.errorResponse = {
            type: "error",
            statusCode,
            message: this.message,
            errorProps,
        };
    }
}
exports.CustomClientError = CustomClientError;
