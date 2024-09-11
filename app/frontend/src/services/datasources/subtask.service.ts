export interface SubtaskService {
    addSubtask(subtaskBody: any): Promise<unknown>;
    getSubtasksByTaskIds(taskIds: string[]): Promise<unknown>;
    patchSubtask(subtaskId: string, patchBody: any): Promise<unknown>;
    deleteSubtask(subtaskId: string): Promise<unknown>;
  }
  