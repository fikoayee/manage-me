import api from "../../../services/infrastructure/axios-config";
import { ILoginBody, IRegisterBody, AuthService } from "../auth.service";
export class AuthServiceImpl implements AuthService {
  private SERVICE_PATH_AUTH = "/auth";

  async login(loginBody: ILoginBody): Promise<any> {
    try {
      const response = await api.post(
        `${this.SERVICE_PATH_AUTH}/login`,
        loginBody
      );
      console.log(response);
      return response;
    } catch (err) {
      throw new Error("Could not login user.");
    }
  }
  async register(registerBody: IRegisterBody): Promise<any> {
    try {
      const response = await api.post(
        `${this.SERVICE_PATH_AUTH}/register`,
        registerBody
      );
      return response;
    } catch (err) {
      throw new Error("Could not register account.");
    }
  }
}
