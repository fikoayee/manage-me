// src/server.ts
import { app } from "./app";
import cors from "cors";
import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import HttpError from "./models/http-error.model";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

// error handling middleware - only executes if request doesnt have an endpoint
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// avoids blocking access by CORS policy
app.use(
  cors({
    credentials: true,
  })
);

// error handling middleware - only executes on request that have thrown an error
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    // checks if error response was already sent
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An uknown error occurred!" });
});

mongoose
  .connect("mongodb://localhost:27017/manage-me-db")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Running on Port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
