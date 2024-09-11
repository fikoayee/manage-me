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
const subtask_model_1 = require("../../../models/subtask.model.js");
const http_error_model_1 = __importDefault(require("../../../models/http-error.model"));
const patchSubtask = (subtaskId, patchSubtaskBody) => __awaiter(void 0, void 0, void 0, function* () {
    const subtask = yield subtask_model_1.Subtask.findOne({
        _id: subtaskId,
    });
    if (!subtask) {
        throw new http_error_model_1.default(`Subtask doesn't exist`, 404);
    }
    const now = new Date();
    switch (patchSubtaskBody.status) {
        case "todo":
            patchSubtaskBody.dateStart = null;
            patchSubtaskBody.dateEnd = null;
            patchSubtaskBody.assigned = null;
            break;
        case "doing":
            if (!patchSubtaskBody.assigned) {
                throw new http_error_model_1.default(`Assigned is required for 'doing' status`, 400);
            }
            if (!subtask.dateStart) {
                patchSubtaskBody.dateStart = now;
            }
            patchSubtaskBody.dateEnd = null;
            break;
        case "done":
            if (!patchSubtaskBody.assigned) {
                throw new http_error_model_1.default(`Assigned is required for 'done' status`, 400);
            }
            patchSubtaskBody.dateStart = subtask.dateStart || now;
            patchSubtaskBody.dateEnd = now;
            break;
        default:
            throw new http_error_model_1.default(`Invalid status`, 400);
    }
    yield subtask_model_1.Subtask.findByIdAndUpdate(subtaskId, patchSubtaskBody);
    const patchedSubtask = yield subtask_model_1.Subtask.findById(subtaskId);
    return patchedSubtask;
});
exports.default = patchSubtask;
