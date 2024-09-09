import { User } from "../../../models/user.model";
const getUser = async (userId: string): Promise<any> => {
  const user: any = await User.find({ _id: userId });
  return user;
};
export default getUser;
