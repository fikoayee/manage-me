// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Path,
  Route,
  Delete,
  Middlewares,
  Request,
} from "tsoa";
import { authenticate } from "../../middlewares/auth";
import { Router, Request as ExRequest } from "express";
import { AuthRequest } from "interfaces/authentication-req.interface";
import getUser from "./implementation/get-user.impl";
import getUsers from "./implementation/get-users.impl";

@Route("users")
export class UserController extends Controller {
  @Get("/user/{userId}")
  @Middlewares([authenticate])
  public async getUser(
    @Request() req: AuthRequest,
    @Path() userId: string
  ): Promise<any> {
    return getUser(userId);
  }
  @Get("/all")
  @Middlewares([authenticate])
  public async getUsers(@Request() req: AuthRequest): Promise<any> {
    return getUsers();
  }
}
