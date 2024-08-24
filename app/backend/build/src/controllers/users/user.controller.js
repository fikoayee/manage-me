"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const dotenv_1 = __importDefault(require("dotenv"));
const register_user_impl_1 = __importDefault(require("./implementation/register-user.impl"));
const login_impl_1 = __importDefault(require("./implementation/login.impl"));
dotenv_1.default.config();
let UserController = class UserController extends tsoa_1.Controller {
    register(registerBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, register_user_impl_1.default)(registerBody);
        });
    }
    login(loginBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, login_impl_1.default)(loginBody);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)("/register"),
    __param(0, (0, tsoa_1.Body)())
], UserController.prototype, "register", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)())
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("users")
], UserController);
