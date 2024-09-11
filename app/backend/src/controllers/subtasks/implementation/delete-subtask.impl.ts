import { Subtask } from "models/subtask.model";
import HttpError from "../../../models/http-error.model";

const deleteSubtask = async (subtaskId: string): Promise<any> => {
  const subtask: any | null = await Subtask.findOne({
    _id: subtaskId,
  });

  if (!subtask) {
    throw new HttpError(`Subtask doesn't exist`, 404);
  }

  await Subtask.findByIdAndDelete(subtaskId);

  return "Subtask has been succesfully deleted";
};
export default deleteSubtask;
