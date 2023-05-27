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
exports.validateLoginForm = exports.validateCreateUserForm = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models/models");
const validator_1 = require("../helpers/validator");
const schema = joi_1.default.object({
    name: joi_1.default.string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .required(),
});
const validateCreateUserForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const validate = schema.validate(requestBody, { abortEarly: false });
        const errorDetails = [];
        if (validate.error) {
            validate.error.details.map((i) => {
                var _a;
                errorDetails.push({
                    key: (_a = i.context) === null || _a === void 0 ? void 0 : _a.key,
                    message: i.message,
                });
            });
            throw new validator_1.CustomClientError(errorDetails, 400);
        }
        else {
            const userEmailIsTaken = yield models_1.User.findOne({ email: requestBody.email });
            if (userEmailIsTaken) {
                errorDetails.push({
                    key: "email",
                    message: "A user with the same email already exist, please try another one",
                });
                throw new validator_1.CustomClientError(errorDetails, 409);
            }
            next();
        }
    }
    catch (error) {
        if (error instanceof validator_1.CustomClientError) {
            console.error(error.message);
            res.status(error.errorResponse.statusCode).json(error.errorResponse);
        }
        else {
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Server Error",
                errorProps: [
                    { key: "server", message: "Something went wrong in our server" },
                ],
            });
        }
    }
});
exports.validateCreateUserForm = validateCreateUserForm;
const validateLoginForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            const errorDetails = [
                { key: "email", message: "Please enter your email" },
            ];
            throw new validator_1.CustomClientError(errorDetails, 400);
        }
        else if (!password) {
            const errorDetails = [
                { key: "password", message: "Please enter your password" },
            ];
            throw new validator_1.CustomClientError(errorDetails, 400);
        }
        else {
            const emailExist = yield models_1.User.findOne({ email });
            if (!emailExist) {
                const errorDetails = [
                    { key: "email", message: "That email is not registered" },
                ];
                throw new validator_1.CustomClientError(errorDetails, 404);
            }
            else {
                const passwordMatched = yield bcrypt_1.default.compare(password, emailExist.password);
                if (!passwordMatched) {
                    const errorDetails = [
                        { key: "password", message: "Password does not match" },
                    ];
                    throw new validator_1.CustomClientError(errorDetails, 400);
                }
                else {
                    next();
                }
            }
        }
    }
    catch (error) {
        if (error instanceof validator_1.CustomClientError) {
            console.error(error.message);
            res.status(error.errorResponse.statusCode).json(error.errorResponse);
        }
        else {
            console.error(error);
            res.status(500).json({
                statusCode: 500,
                message: "Server Error",
                errorProps: [
                    { key: "server", message: "Something went wrong in our server" },
                ],
            });
        }
    }
});
exports.validateLoginForm = validateLoginForm;
