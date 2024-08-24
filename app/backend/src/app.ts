// src/app.ts
import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
// avoids blocking access by CORS policy
app.use(
  cors({
    credentials: true,
  })
);
app.use(json());

RegisterRoutes(app);
