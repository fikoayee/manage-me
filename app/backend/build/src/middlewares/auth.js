"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
const http_error_model_1 = __importDefault(require("../models/http-error.model"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log("tescikffffffffffff");
    console.log(token);
    if (!token) {
        console.log("faq");
        throw new http_error_model_1.default(`No token provided`, 401);
    }
    console.log("ippp");
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        console.log("co teraz");
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch (err) {
        console.log(err);
        throw new http_error_model_1.default(`Invalid token`, 401);
    }
};
exports.authenticate = authenticate;
