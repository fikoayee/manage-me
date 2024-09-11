import { SubtaskServiceImpl } from "../services/datasources/impl/subtask.service.impl";

const subtaskService = new SubtaskServiceImpl();

export const useSubtask = () => {
  const addSubtask = async (subtask: any) => {
    try {
      const response = await subtaskService.addSubtask(subtask);
      return response;
    } catch (err) {
      return null;
    }
  };

  const getSubtasksByTaskIds = async (taskIds: string[]) => {
    try {
      const response = await subtaskService.getSubtasksByTaskIds(taskIds);
      return response.data;
    } catch (err) {
      return null;
    }
  };

  const patchSubtask = async (subtaskId: string, patchBody: any) => {
    try {
      const response = await subtaskService.patchSubtask(subtaskId, patchBody);
      return response;
    } catch (err) {
      return null;
    }
  };

  const deleteSubtask = async (subtaskId: string) => {
    try {
      const response = await subtaskService.deleteSubtask(subtaskId);
      return response;
    } catch (err) {
      return null;
    }
  };

  return {
    addSubtask,
    getSubtasksByTaskIds,
    patchSubtask,
    deleteSubtask,
  };
};
