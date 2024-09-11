import { Subtask } from "models/subtask.model";

const getTaskSubtasks = async (taskId: string[]): Promise<any> => {
  const subtasks: any = await Subtask.find({ task: { $in: taskId } });
  return subtasks;
};
export default getTaskSubtasks;
