// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Path,
  Route,
  Delete,
  Middlewares,
  Request,
} from "tsoa";
import getProjectList from "./implementation/get-project-list.impl";
import addProject from "./implementation/add-project.impl";
import patchProject from "./implementation/patch-project.impl";
import deleteProject from "./implementation/delete-project.impl";
import getProject from "./implementation/get-project.impl";
import { GetProjectListDto } from "../../dto/projects/get-project-list.dto";
import { ProjectDTO } from "dto/projects/project.dto";
import { authenticate } from "../../middlewares/auth";
import { Router, Request as ExRequest } from "express";
import { AuthRequest } from "interfaces/authentication-req.interface";

@Route("projects")
export class ProjectController extends Controller {
  @Get("/all")
  @Middlewares([authenticate])
  public async getProjectList(
    @Request() req: AuthRequest
  ): Promise<GetProjectListDto> {
    return getProjectList();
  }
  @Get("/project/{projectId}")
  @Middlewares([authenticate])
  public async getProject(@Path() projectId: string): Promise<any> {
    return getProject(projectId);
  }
  @Post("/project")
  @Middlewares([authenticate])
  public async addProject(@Body() addProjectBody: any): Promise<unknown> {
    return addProject(addProjectBody);
  }
  @Patch("/project/{projectId}")
  @Middlewares([authenticate])
  public async patchProject(
    @Path() projectId: string,
    @Body() patchProjectBody: any
  ): Promise<unknown> {
    return patchProject(projectId, patchProjectBody);
  }
  @Delete("/project/{projectId}")
  @Middlewares([authenticate])
  public async deleteProject(@Path() projectId: string): Promise<unknown> {
    return deleteProject(projectId);
  }
}
