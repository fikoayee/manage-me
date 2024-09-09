import { PriorityEnum } from "../constants/priority.constants";
import { StatusEnum } from "../constants/status.constants";
import mongoose, { Schema, Types, InferSchemaType, Model } from "mongoose";
import { OmitTimestamps } from "../interfaces/omit-timestamps.interface";

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: PriorityEnum,
    default: PriorityEnum.LOW,
    required: true,
  },

  project: { type: Types.ObjectId, ref: "Project", required: true },
  dateCreate: { type: Date, default: () => new Date(), required: true },
  status: {
    type: String,
    enum: StatusEnum,
    default: StatusEnum.TODO,
    required: true,
  },
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

type ITaskSchema = InferSchemaType<typeof taskSchema>;

// Interface with the required methods
interface ITask extends OmitTimestamps<ITaskSchema>, Document {}

const Task: Model<ITaskSchema> = mongoose.model<ITaskSchema>(
  "Task",
  taskSchema
);

export { Task, ITask, ITaskSchema };
