import { Subtask } from "models/subtask.model";
import HttpError from "../../../models/http-error.model";
import { addSubtaskBody } from "../../../interfaces/add-subtask.interface";

const addSubtask = async (subtaskBody: addSubtaskBody): Promise<any> => {
  if (["doing", "done"].includes(subtaskBody.status) && !subtaskBody.assigned) {
    throw new HttpError(
      'Assigned person is required for "doing" or "done" status',
      400
    );
  }

  const now = new Date().toISOString();

  switch (subtaskBody.status) {
    case "todo":
      subtaskBody.dateStart = null;
      subtaskBody.dateEnd = null;
      subtaskBody.assigned = null;
      break;

    case "doing":
      subtaskBody.dateStart = now;
      subtaskBody.dateEnd = null;
      break;

    case "done":
      subtaskBody.dateStart = now;
      subtaskBody.dateEnd = now;
      break;
  }
  console.log(subtaskBody)
  const subtask: any = await Subtask.create(subtaskBody);
  return subtask;
};

export default addSubtask;
