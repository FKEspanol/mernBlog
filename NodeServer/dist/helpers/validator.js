"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomClientError = void 0;
class CustomClientError extends Error {
    constructor(errorList, statusCode) {
        super("CustomClientError has occured");
        this.errorList = errorList;
        this.type = "CustomClientError";
        this.statusCode = statusCode;
    }
}
exports.CustomClientError = CustomClientError;
