import { User } from "../../../models/user.model";
const getUsers = async (): Promise<any> => {
  const users: any = await User.find();
  return users;
};
export default getUsers;
