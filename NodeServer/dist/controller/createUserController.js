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
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models/models");
const registerFormValidator_1 = __importDefault(require("./helpers/registerFormValidator"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const validate = registerFormValidator_1.default.validate({ password });
        if (validate.error) {
            return res.status(400).json({ error: validate.error.details[0] });
        }
        const userEmailTaken = yield models_1.User.findOne({ email });
        if (userEmailTaken)
            return res.status(409).json({ error: 'A user with the same email already exist, please try another one' });
        const hashedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
        const newUser = yield new models_1.User({ name, email, password: hashedPassword }).save();
        res.status(201).json({ newUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = createUser;
