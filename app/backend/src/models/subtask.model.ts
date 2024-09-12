import { PriorityEnum } from "../constants/priority.constants";
import { StatusEnum } from "../constants/status.constants";
import mongoose, { Schema, Types, InferSchemaType, Model } from "mongoose";
import { OmitTimestamps } from "../interfaces/omit-timestamps.interface";

const subtaskSchema = new Schema({
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

  task: { type: Types.ObjectId, ref: "Task", required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: StatusEnum,
    default: StatusEnum.TODO,
    required: true,
  },
  dateCreate: { type: Date, default: () => new Date(), required: true },
  dateStart: { type: Date, default: null },
  dateEnd: { type: Date, default: null },
  assigned: { type: Types.ObjectId, ref: "User", default: null },
});

type ISubtaskSchema = InferSchemaType<typeof subtaskSchema>;

// Interface with the required methods
interface ISubtask extends OmitTimestamps<ISubtaskSchema>, Document {}

const Subtask: Model<ISubtaskSchema> = mongoose.model<ISubtaskSchema>(
  "Subtask",
  subtaskSchema
);

export { Subtask, ISubtask, ISubtaskSchema };
