import { User } from "../../../models/user.model";
import HttpError from "../../../models/http-error.model";
import { loginBody } from "interfaces/login-body.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (loginBody: loginBody): Promise<any> => {
  const { email, password } = loginBody;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new HttpError("An account with this email doesn't exist.", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError("Wrong password.", 401);
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
export default login;
