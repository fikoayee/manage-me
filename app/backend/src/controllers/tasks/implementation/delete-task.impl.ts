import { Task } from "models/task.model";
import HttpError from "../../../models/http-error.model";
import { User } from "models/user.model";

const deleteTask = async (userId: string, taskId: string): Promise<any> => {
  const task: any | null = await Task.findOne({
    _id: taskId,
  });

  if (!task) {
    throw new HttpError(`Task doesn't exist`, 404);
  }

  const user: any | null = await User.findOne({ _id: userId });

  if (task.owner.toString() !== userId && user.role !== "admin") {
    throw new HttpError(`You don't have privileges`, 403);
  }

  await Task.findByIdAndDelete(taskId);

  return "Task has been succesfully deleted";
};
export default deleteTask;
