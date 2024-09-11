import { addSubtaskBody } from "interfaces/add-task.interface copy";
import { Subtask } from "models/subtask.model";

const addSubtask = async (subtaskkBody: addSubtaskBody): Promise<any> => {
  const subtask: any = await Subtask.create(subtaskkBody);
  return subtask;
};
export default addSubtask;
