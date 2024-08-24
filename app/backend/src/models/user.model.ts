import { RoleEnum } from "../constants/roles.constants";
import mongoose, { Schema, Types, InferSchemaType, Model } from "mongoose";
import { OmitTimestamps } from "../interfaces/omit-timestamps.interface";
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
    selected: true,
  },
  role: {
    type: String,
    default: RoleEnum.DEVELOPER,
    enum: RoleEnum,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Interface with the required methods
interface IUserSchema extends InferSchemaType<typeof userSchema>, Document {}

type IUser = InferSchemaType<typeof userSchema>;

const User: Model<IUserSchema> = mongoose.model<IUserSchema>(
  "User",
  userSchema
);

export { User, IUser, IUserSchema };
