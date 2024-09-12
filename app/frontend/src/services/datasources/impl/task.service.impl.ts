import api from "../../../services/infrastructure/axios-config";

import { TaskService } from "../task.service";
export class TaskServiceImpl implements TaskService {
  private SERVICE_PATH_TASKS = "/tasks";

  async addTask(taskBody: any): Promise<unknown> {
    taskBody.dateCreate = new Date();
    taskBody.status = taskBody.status? taskBody.status : 'todo' 
    taskBody.priority = taskBody.priority? taskBody.priority : 'high' 
    try {
      const respnse = await api.post(
        `${this.SERVICE_PATH_TASKS}/task`,
        taskBody
      );
      return respnse;
    } catch (err) {
      throw new Error("Could not add task.");
    }
  }

  async getProjectTasks(projectId: string): Promise<unknown> {
    try {
      const response = await api.get(
        `${this.SERVICE_PATH_TASKS}/project/${projectId}`
      );
      return response;
    } catch (err) {
      throw new Error("Could not get tasks for specified project");
    }
  }

  async patchTask(taskId: string, patchBody: any): Promise<unknown> {
    try {
      const response = await api.patch(
        `${this.SERVICE_PATH_TASKS}/task/${taskId}`,
        patchBody
      );
      return response;
    } catch (err) {
      throw new Error("Could not patch the task");
    }
  }

  async deleteTask(taskId: string): Promise<unknown> {
    try {
      const response = await api.delete(
        `${this.SERVICE_PATH_TASKS}/task/${taskId}`
      );
      return response;
    } catch (err) {
      throw new Error("Could not delete the task");
    }
  }
}
