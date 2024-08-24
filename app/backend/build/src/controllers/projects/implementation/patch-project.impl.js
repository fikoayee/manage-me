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
const project_model_1 = require("../../../models/project.model");
const http_error_model_1 = __importDefault(require("../../../models/http-error.model"));
const patchProject = (projectId, patchProjectBody) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findOne({
        _id: projectId,
    });
    if (!project) {
        throw new http_error_model_1.default(`There is no project with id ${projectId}`, 404);
    }
    yield project_model_1.Project.findByIdAndUpdate(project.id, {
        name: patchProjectBody.name,
        description: patchProjectBody.description,
    });
    const patchedProject = yield project_model_1.Project.findById(project._id);
    return patchedProject;
});
exports.default = patchProject;
