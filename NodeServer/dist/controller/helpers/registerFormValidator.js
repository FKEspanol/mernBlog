"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string()
        .email()
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .required()
});
const validateRequestBody = (req) => {
    var _a;
    const requestBody = req.body;
    const validate = schema.validate(requestBody);
    if (validate.error) {
        const errorDetails = validate.error.details[0];
        return {
            errors: {
                key: (_a = errorDetails.context) === null || _a === void 0 ? void 0 : _a.key,
                message: errorDetails.message,
            },
            errorDetails
        };
    }
    return null;
};
exports.default = validateRequestBody;
