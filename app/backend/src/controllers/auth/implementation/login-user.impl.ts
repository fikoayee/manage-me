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
    "8f6e27b1e3d6e1a9170fc3cba5d8c4e0b22e5f92f9b7f8246c5c2e4b5ed2f89ef",
    { expiresIn: "1h" }
  );
  return { token: token, user: user };
};
export default login;
