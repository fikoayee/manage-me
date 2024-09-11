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
import deleteSubtask from "./implementation/delete-subtask.impl";
import patchSubtask from "./implementation/patch-subtask.impl";
import getTaskSubtasks from "./implementation/get-task-subtasks.impl";
import addTask from "controllers/tasks/implementation/add-task.impl";

@Route("subtasks")
export class TaskController extends Controller {
  @Post("/subtask")
  @Middlewares([authenticate])
  public async addSubtask(@Body() addSubtaskBody: any): Promise<unknown> {
    return addTask(addSubtaskBody);
  }
  @Get("/task/all")
  @Middlewares([authenticate])
  public async getTaskSubtasks(@Path() taskId: string[]): Promise<unknown> {
    return getTaskSubtasks(taskId);
  }
  @Patch("subtask/{subtaskId}")
  @Middlewares([authenticate])
  public async patchSubtask(
    @Path() subtaskId: string,
    @Body() patchSubtaskBody: any
  ): Promise<unknown> {
    return patchSubtask(subtaskId, patchSubtaskBody);
  }
  @Delete("/subtask/{subtaskId}")
  @Middlewares([authenticate])
  public async deleteTask(
    @Path() subtaskId: string
  ): Promise<unknown> {
    return deleteSubtask(subtaskId);
  }
}
