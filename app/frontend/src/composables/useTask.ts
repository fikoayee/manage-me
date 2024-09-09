import { TaskServiceImpl } from "../services/datasources/impl/task.service.impl";

const taskService = new TaskServiceImpl();

export const useTask = () => {
  const addTask = async (task: any) => {
    try {
      const response = await taskService.addTask(task);
      return response;
    } catch (error) {
      return null;
    }
  };
  const getProjectTasks = async (projectId: string) => {
    try {
      const response = await taskService.getProjectTasks(projectId);
      return response.data;
    } catch (error) {
      return null;
    }
  };
  const patchTask = async (taskId: string, patchBody: any) => {
    try {
      const response = await taskService.patchTask(taskId, patchBody);
      return response;
    } catch (error) {
      return null;
    }
  };
  const deleteTask = async (taskId: string) => {
    try {
      const response = await taskService.deleteTask(taskId);
      return response;
    } catch (error) {
      return null;
    }
  };

  return {
    addTask,
    getProjectTasks,
    patchTask,
    deleteTask,
  };
};
