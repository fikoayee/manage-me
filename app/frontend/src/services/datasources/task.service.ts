export interface TaskService {
  addTask(taskBody: any): Promise<unknown>;
  getProjectTasks(projectId: string): Promise<unknown>;
  patchTask(taskId: string, patchBody: any): Promise<unknown>;
  deleteTask(taskId: string): Promise<unknown>;
}

// export interface IProjectBody {
//   name: String;
//   description: String;
//   color: String;
// }
