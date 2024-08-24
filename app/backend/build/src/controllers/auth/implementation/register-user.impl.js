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
const user_model_1 = require("../../../models/user.model");
const http_error_model_1 = __importDefault(require("../../../models/http-error.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (registerBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role, color } = registerBody;
    const userExist = yield user_model_1.User.findOne({ email });
    if (userExist) {
        throw new http_error_model_1.default("An account with this email already exists.", 409);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new user_model_1.User({
        email,
        password: hashedPassword,
        role,
        color,
    });
    const user = yield user_model_1.User.create(newUser);
    return user;
});
exports.default = registerUser;
