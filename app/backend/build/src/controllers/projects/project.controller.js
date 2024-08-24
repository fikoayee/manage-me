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
exports.ProjectController = void 0;
// src/users/usersController.ts
const tsoa_1 = require("tsoa");
const get_project_list_impl_1 = __importDefault(require("./implementation/get-project-list.impl"));
const add_project_impl_1 = __importDefault(require("./implementation/add-project.impl"));
const patch_project_impl_1 = __importDefault(require("./implementation/patch-project.impl"));
const delete_project_impl_1 = __importDefault(require("./implementation/delete-project.impl"));
const get_project_impl_1 = __importDefault(require("./implementation/get-project.impl"));
let ProjectController = class ProjectController extends tsoa_1.Controller {
    getProjectList() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, get_project_list_impl_1.default)();
        });
    }
    getProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, get_project_impl_1.default)(projectId);
        });
    }
    addProject(addProjectBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, add_project_impl_1.default)(addProjectBody);
        });
    }
    patchProject(projectId, patchProjectBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, patch_project_impl_1.default)(projectId, patchProjectBody);
        });
    }
    deleteProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, delete_project_impl_1.default)(projectId);
        });
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, tsoa_1.Get)("/all")
], ProjectController.prototype, "getProjectList", null);
__decorate([
    (0, tsoa_1.Get)("/project/{projectId}"),
    __param(0, (0, tsoa_1.Path)())
], ProjectController.prototype, "getProject", null);
__decorate([
    (0, tsoa_1.Post)("/project"),
    __param(0, (0, tsoa_1.Body)())
], ProjectController.prototype, "addProject", null);
__decorate([
    (0, tsoa_1.Patch)("/project/{projectId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)())
], ProjectController.prototype, "patchProject", null);
__decorate([
    (0, tsoa_1.Delete)("/project/{projectId}"),
    __param(0, (0, tsoa_1.Path)())
], ProjectController.prototype, "deleteProject", null);
exports.ProjectController = ProjectController = __decorate([
    (0, tsoa_1.Route)("projects")
], ProjectController);
