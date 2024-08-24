import { UserRoleEnum } from "../../constants/user-role.enum";

export interface AuthService {
  login(loginBody: ILoginBody): Promise<unknown>;
  register(registerBody: IRegisterBody): Promise<unknown>;
}

export interface ILoginBody {
  email: string;
  password: string;
}
export interface IRegisterBody {
  email: string;
  password: string;
  role: UserRoleEnum;
}
