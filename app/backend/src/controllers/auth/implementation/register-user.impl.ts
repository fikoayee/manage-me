import { User } from "../../../models/user.model";
import { registerBody } from "interfaces/register-body";
import HttpError from "../../../models/http-error.model";
import bcrypt from "bcrypt";

const registerUser = async (registerBody: registerBody): Promise<any> => {
  const { email, password, role, color } = registerBody;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new HttpError("An account with this email already exists.", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    color,
  });
  const user: any = await User.create(newUser);

  return user;
};
export default registerUser;
