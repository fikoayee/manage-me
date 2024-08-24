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
Object.defineProperty(exports, "__esModule", { value: true });
const project_model_1 = require("../../../models/project.model");
const patchProject = (projectId, patchProjectBody) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findOne({
        _id: projectId,
    });
    if (!project) {
        throw new Error("brak");
    }
    yield project_model_1.Project.findByIdAndUpdate(project.id, {
        name: patchProjectBody.name,
        description: patchProjectBody.description,
    });
    const patchedProject = yield project_model_1.Project.findById(project._id);
    return patchedProject;
});
exports.default = patchProject;
