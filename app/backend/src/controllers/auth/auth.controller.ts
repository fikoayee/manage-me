import { Body, Controller, Post, Route } from "tsoa";
import dotenv from "dotenv";
import registerUser from "./implementation/register-user.impl";
import login from "./implementation/login-user.impl";

dotenv.config();

@Route("auth")
export class AuthController extends Controller {
  @Post("/register")
  public async register(@Body() registerBody: any): Promise<any> {
    return registerUser(registerBody);
  }
  @Post("/login")
  public async login(@Body() loginBody: any): Promise<any> {
    return login(loginBody);
  }
}
