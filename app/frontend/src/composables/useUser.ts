import { UserServiceImpl } from "../services/datasources/impl/user.service.impl";

const userService = new UserServiceImpl();

export const useUser = () => {
  const getUser = async (userId: string) => {
    try {
      const response: any = await userService.getUser(userId);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getUsers = async () => {
    try {
      const response: any = await userService.getUsers();
      return response.data;
    } catch (err) {
      return null;
    }
  };
  return {
    getUser,
    getUsers,
  };
};
