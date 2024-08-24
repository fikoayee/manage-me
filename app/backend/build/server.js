"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = require("./app");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_error_model_1 = __importDefault(require("./models/http-error.model"));
const port = process.env.PORT || 3000;
// error handling middleware - only executes if request doesnt have an endpoint
app_1.app.use((req, res, next) => {
    const error = new http_error_model_1.default("Could not find this route.", 404);
    throw error;
});
// avoids blocking access by CORS policy
app_1.app.use((0, cors_1.default)({
    credentials: true,
}));
// error handling middleware - only executes on request that have thrown an error
app_1.app.use((error, req, res, next) => {
    if (res.headersSent) {
        // checks if error response was already sent
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An uknown error occurred!" });
});
mongoose_1.default
    .connect("mongodb://localhost:27017/manage-me-db")
    .then(() => {
    console.log("Connected to MongoDB");
    app_1.app.listen(port, () => {
        console.log(`Running on Port http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
