import { addTaskBody } from "interfaces/add-task.interface";
import { Task } from "models/task.model";

const addTask = async (taskBody: addTaskBody): Promise<any> => {
  const task: any = await Task.create(taskBody);
  return task;
};
export default addTask;
