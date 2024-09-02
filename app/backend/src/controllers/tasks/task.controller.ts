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
import { authenticate } from "../../middlewares/auth";
import { Router, Request as ExRequest } from "express";
import { AuthRequest } from "interfaces/authentication-req.interface";
import addTask from "./implementation/add-task.impl";
import getProjectTasks from "./implementation/get-project-tasks.impl";
import patchTask from "./implementation/patch-task.impl";
import deleteTask from "./implementation/delete-task.impl";

@Route("tasks")
export class TaskController extends Controller {
  @Post("/task")
  @Middlewares([authenticate])
  public async addTask(@Body() addTaskBody: any): Promise<unknown> {
    return addTask(addTaskBody);
  }
  @Get("/project/{projectId}")
  @Middlewares([authenticate])
  public async getProjectTasks(@Path() projectId: string): Promise<any> {
    return getProjectTasks(projectId);
  }
  @Patch("/task/{taskId}")
  @Middlewares([authenticate])
  public async patchTask(
    @Request() req: AuthRequest,
    @Path() taskId: string,
    @Body() patchTaskBody: any
  ): Promise<unknown> {
    return patchTask(req.user.userId, taskId, patchTaskBody);
  }

  @Delete("/task/{taskId}")
  @Middlewares([authenticate])
  public async deleteTask(
    @Request() req: AuthRequest,
    @Path() taskId: string,
    @Body() patchTaskBody: any
  ): Promise<unknown> {
    return deleteTask(req.user.userId, taskId);
  }
}
