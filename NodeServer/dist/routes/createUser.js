"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUserController_1 = __importDefault(require("../controller/createUserController"));
const registerFormValidator_1 = __importDefault(require("../middleware/registerFormValidator"));
const router = express_1.default.Router();
router.post('/createUser', registerFormValidator_1.default, createUserController_1.default);
exports.default = router;
