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
const getProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findById(projectId);
    if (!project) {
        throw new http_error_model_1.default(`There is no project with id ${projectId}`, 500);
    }
    return { project: project };
});
exports.default = getProject;
