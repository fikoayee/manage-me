import { Task } from "models/task.model";

const getProjectTasks = async (projectId: string): Promise<any> => {
  const tasks: any = await Task.find({ project: projectId });
  return tasks;
};
export default getProjectTasks;
