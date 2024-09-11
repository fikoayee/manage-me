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
exports.SubtaskController = void 0;
// src/users/usersController.ts
const tsoa_1 = require("tsoa");
const auth_1 = require("../../middlewares/auth");
const delete_subtask_impl_1 = __importDefault(require("../../controllers/subtasks/implementation/delete-subtask.impl"));
const patch_subtask_impl_1 = __importDefault(require("../../controllers/subtasks/implementation/patch-subtask.impl"));
const get_task_subtasks_impl_1 = __importDefault(require("../../controllers/subtasks/implementation/get-task-subtasks.impl"));
const add_task_impl_1 = __importDefault(require("../../controllers/subtasks/implementation/add-subtask.impl"));
let SubtaskController = class SubtaskController extends tsoa_1.Controller {
    addSubtask(addSubtaskBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, add_task_impl_1.default)(addSubtaskBody);
        });
    }
    getTaskSubtasks(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, get_task_subtasks_impl_1.default)(taskId);
        });
    }
    patchSubtask(subtaskId, patchSubtaskBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, patch_subtask_impl_1.default)(subtaskId, patchSubtaskBody);
        });
    }
    deleteTask(subtaskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, delete_subtask_impl_1.default)(subtaskId);
        });
    }
};
exports.SubtaskController = SubtaskController;
__decorate([
    (0, tsoa_1.Post)("/subtask"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Body)())
], SubtaskController.prototype, "addSubtask", null);
__decorate([
    (0, tsoa_1.Get)("/task/all"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Query)("taskId"))
], SubtaskController.prototype, "getTaskSubtasks", null);
__decorate([
    (0, tsoa_1.Patch)("subtask/{subtaskId}"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)())
], SubtaskController.prototype, "patchSubtask", null);
__decorate([
    (0, tsoa_1.Delete)("/subtask/{subtaskId}"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Path)())
], SubtaskController.prototype, "deleteTask", null);
exports.SubtaskController = SubtaskController = __decorate([
    (0, tsoa_1.Route)("subtasks")
], SubtaskController);
