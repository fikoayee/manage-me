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
const subtask_model_1 = require("../../../models/subtask.model");
const http_error_model_1 = __importDefault(require("../../../models/http-error.model"));
const addSubtask = (subtaskBody) => __awaiter(void 0, void 0, void 0, function* () {
    if (["doing", "done"].includes(subtaskBody.status) && !subtaskBody.assigned) {
        throw new http_error_model_1.default('Assigned person is required for "doing" or "done" status', 400);
    }
    const now = new Date().toISOString();
    switch (subtaskBody.status) {
        case "todo":
            subtaskBody.dateStart = null;
            subtaskBody.dateEnd = null;
            subtaskBody.assigned = null;
            break;
        case "doing":
            subtaskBody.dateStart = now;
            subtaskBody.dateEnd = null;
            break;
        case "done":
            subtaskBody.dateStart = now;
            subtaskBody.dateEnd = now;
            break;
    }
    console.log(subtaskBody);
    const subtask = yield subtask_model_1.Subtask.create(subtaskBody);
    return subtask;
});
exports.default = addSubtask;
