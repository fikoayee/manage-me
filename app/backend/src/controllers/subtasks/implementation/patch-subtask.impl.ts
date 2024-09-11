import { Subtask } from "models/subtask.model";
import HttpError from "../../../models/http-error.model";

const patchSubtask = async (
  subtaskId: string,
  patchSubtaskBody: any
): Promise<any> => {
  const subtask: any | null = await Subtask.findOne({
    _id: subtaskId,
  });

  if (!subtask) {
    throw new HttpError(`Subtask doesn't exist`, 404);
  }

  const now = new Date();

  switch (patchSubtaskBody.status) {
    case "todo":
      patchSubtaskBody.dateStart = null;
      patchSubtaskBody.dateEnd = null;
      patchSubtaskBody.assigned = null;
      break;

    case "doing":
      if (!patchSubtaskBody.assigned) {
        throw new HttpError(`Assigned is required for 'doing' status`, 400);
      }
      if (!subtask.dateStart) {
        patchSubtaskBody.dateStart = now;
      }
      patchSubtaskBody.dateEnd = null;
      break;

    case "done":
      if (!patchSubtaskBody.assigned) {
        throw new HttpError(`Assigned is required for 'done' status`, 400);
      }
      patchSubtaskBody.dateStart = subtask.dateStart || now;
      patchSubtaskBody.dateEnd = now;
      break;

    default:
      throw new HttpError(`Invalid status`, 400);
  }

  await Subtask.findByIdAndUpdate(subtaskId, patchSubtaskBody);
  const patchedSubtask = await Subtask.findById(subtaskId);

  return patchedSubtask;
};
export default patchSubtask;
