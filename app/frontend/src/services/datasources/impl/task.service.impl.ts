import api from "../../../services/infrastructure/axios-config"; 
import { SubtaskService } from "../subtask.service"; 

export class SubtaskServiceImpl implements SubtaskService {
  private SERVICE_PATH_SUBTASKS = "/subtasks";


  async addSubtask(subtaskBody: any): Promise<unknown> {
    try {
      const response = await api.post(
        `${this.SERVICE_PATH_SUBTASKS}/subtask`,
        subtaskBody
      );
      return response.data; 
    } catch (err) {
      console.error(err);
      throw new Error("Could not add subtask.");
    }
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<unknown> {
    try {
      const response = await api.get(
        `${this.SERVICE_PATH_SUBTASKS}/task/all`,
        { params: { taskId: taskIds } } 
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error("Could not get subtasks for specified tasks.");
    }
  }


  async patchSubtask(subtaskId: string, patchBody: any): Promise<unknown> {
    try {
      const response = await api.patch(
        `${this.SERVICE_PATH_SUBTASKS}/subtask/${subtaskId}`,
        patchBody
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error("Could not patch the subtask.");
    }
  }


  async deleteSubtask(subtaskId: string): Promise<unknown> {
    try {
      const response = await api.delete(
        `${this.SERVICE_PATH_SUBTASKS}/subtask/${subtaskId}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error("Could not delete the subtask.");
    }
  }
}
