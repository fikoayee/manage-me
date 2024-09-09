import { UserServiceImpl } from "../services/datasources/impl/user.service.impl";

const userService = new UserServiceImpl();

export const useUser = () => {
  const getUser = async (userId: string) => {
    try {
      const response = await userService.getUser(userId);
      return response.data;
    } catch (error) {
      return null;
    }
  };
  return {
    getUser,
  };
};
