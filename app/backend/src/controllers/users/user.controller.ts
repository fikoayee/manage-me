import { Body, Controller, Post, Route } from "tsoa";
import { User } from "../../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import registerUser from "./implementation/register-user.impl";
import login from "./implementation/login.impl";

dotenv.config();

@Route("users")
export class UserController extends Controller {
  @Post("/register")
  public async register(@Body() registerBody: any): Promise<any> {
    return registerUser(registerBody);
  }
  @Post("/login")
  public async login(@Body() loginBody: any): Promise<any> {
    return login(loginBody);
  }
}
