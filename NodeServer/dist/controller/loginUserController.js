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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models/models");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield models_1.User.findOne({ email });
        if (user) {
            const accessToken = jsonwebtoken_1.default.sign({
                _id: user === null || user === void 0 ? void 0 : user._id,
                username: user === null || user === void 0 ? void 0 : user.name,
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
            const refreshToken = jsonwebtoken_1.default.sign({
                username: user === null || user === void 0 ? void 0 : user._id,
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
            yield models_1.User.findByIdAndUpdate({ _id: user._id }, { $set: { refreshToken } }); // Saving refreshToken with current user
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json(accessToken);
        }
        else {
            throw new Error("Server Error");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                type: "error",
                message: error.message,
            });
            console.log(error);
        }
    }
});
