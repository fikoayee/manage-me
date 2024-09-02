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
exports.TaskController = void 0;
// src/users/usersController.ts
const tsoa_1 = require("tsoa");
const auth_1 = require("../../middlewares/auth");
const add_task_impl_1 = __importDefault(require("./implementation/add-task.impl"));
const get_project_tasks_impl_1 = __importDefault(require("./implementation/get-project-tasks.impl"));
const patch_task_impl_1 = __importDefault(require("./implementation/patch-task.impl"));
const delete_task_impl_1 = __importDefault(require("./implementation/delete-task.impl"));
let TaskController = class TaskController extends tsoa_1.Controller {
    addTask(addTaskBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, add_task_impl_1.default)(addTaskBody);
        });
    }
    getProjectTasks(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, get_project_tasks_impl_1.default)(projectId);
        });
    }
    patchTask(req, taskId, patchTaskBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, patch_task_impl_1.default)(req.user.userId, taskId, patchTaskBody);
        });
    }
    deleteTask(req, taskId, patchTaskBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, delete_task_impl_1.default)(req.user.userId, taskId);
        });
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, tsoa_1.Post)("/task"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Body)())
], TaskController.prototype, "addTask", null);
__decorate([
    (0, tsoa_1.Get)("/project/{projectId}"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Path)())
], TaskController.prototype, "getProjectTasks", null);
__decorate([
    (0, tsoa_1.Patch)("/task/{taskId}"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)())
], TaskController.prototype, "patchTask", null);
__decorate([
    (0, tsoa_1.Delete)("/task/{taskId}"),
    (0, tsoa_1.Middlewares)([auth_1.authenticate]),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)())
], TaskController.prototype, "deleteTask", null);
exports.TaskController = TaskController = __decorate([
    (0, tsoa_1.Route)("tasks")
], TaskController);
