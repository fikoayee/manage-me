"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, '8f6e27b1e3d6e1a9170fc3cba5d8c4e0b22e5f92f9b7f8246c5c2e4b5ed2f89ef');
};
exports.verifyToken = verifyToken;
