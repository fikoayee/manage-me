import mongoose, { InferSchemaType, Schema, Model, Document } from "mongoose";
import { OmitTimestamps } from "../interfaces/omit-timestamps.interface";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    description: {
      type: String,
      maxlength: 250,
    },
  },
  {
    collection: "projects",
  }
);

type IProjectSchema = InferSchemaType<typeof projectSchema>;

// Interface with the required methods
interface IProject extends OmitTimestamps<IProjectSchema>, Document {}

const Project: Model<IProjectSchema> = mongoose.model<IProjectSchema>(
  "Project",
  projectSchema
);

export { Project, IProject, IProjectSchema };
