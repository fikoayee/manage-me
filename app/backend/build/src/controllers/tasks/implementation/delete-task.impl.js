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
const task_model_1 = require("../../../models/task.model");
const http_error_model_1 = __importDefault(require("../../../models/http-error.model"));
const user_model_1 = require("../../../models/user.model");
const deleteTask = (userId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findOne({
        _id: taskId,
    });
    if (!task) {
        throw new http_error_model_1.default(`Task doesn't exist`, 404);
    }
    const user = yield user_model_1.User.findOne({ _id: userId });
    if (task.owner.toString() !== userId && user.role !== "admin") {
        throw new http_error_model_1.default(`You don't have privileges`, 403);
    }
    yield task_model_1.Task.findByIdAndDelete(taskId);
    return "Task has been succesfully deleted";
});
exports.default = deleteTask;
