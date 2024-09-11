"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subtask = void 0;
const priority_constants_1 = require("../constants/priority.constants");
const status_constants_1 = require("../constants/status.constants");
const mongoose_1 = __importStar(require("mongoose"));
const subtaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: priority_constants_1.PriorityEnum,
        default: priority_constants_1.PriorityEnum.LOW,
        required: true,
    },
    task: { type: mongoose_1.Types.ObjectId, ref: "Task", required: true },
    time: { type: String, required: true },
    status: {
        type: String,
        enum: status_constants_1.StatusEnum,
        default: status_constants_1.StatusEnum.TODO,
        required: true,
    },
    dateCreate: { type: Date, default: () => new Date(), required: true },
    dateStart: { type: Date },
    dateEnd: { type: Date },
    assigned: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
const Subtask = mongoose_1.default.model("Subtask", subtaskSchema);
exports.Subtask = Subtask;
