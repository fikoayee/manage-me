import api from "../../../services/infrastructure/axios-config";
import { ILoginBody, IRegisterBody, UserService } from "../user.service";
export class UserServiceImpl implements UserService {
  private SERVICE_PATH_USERS = "/users";

  async login(loginBody: ILoginBody): Promise<any> {
    try {
      const response = await api.post(
        `${this.SERVICE_PATH_USERS}/login`,
        loginBody
      );
      return response;
    } catch (err) {
      throw new Error("Wrong password.");
    }
  }
  async register(registerBody: IRegisterBody): Promise<any> {
    try {
      const response = await api.post(
        `${this.SERVICE_PATH_USERS}/register`,
        registerBody
      );
      return response;
    } catch (err) {
      throw new Error("Could not register account.");
    }
  }
  async getUser(userId: string): Promise<unknown> {
    try {
      const response = await api.get(
        `${this.SERVICE_PATH_USERS}/user/${userId}`
      );
      return response;
    } catch (err) {
      throw new Error("Could not get the user");
    }
  }
  async getUsers(): Promise<unknown> {
    try {
      const response = await api.get(`${this.SERVICE_PATH_USERS}/all`);
      return response;
    } catch (err) {
      throw new Error("Could not get the list of users");
    }
  }
}
