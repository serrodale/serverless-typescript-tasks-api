require("dotenv").config();

import express from "express";
import serverless from "serverless-http";
import { defineRoutes } from "./routes";
import { defineMiddlewares } from "./middlewares";

export const app = express();

defineRoutes(app);
defineMiddlewares(app);

export const handler = serverless(app);
