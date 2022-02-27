import bodyParser from "body-parser";
import { Application } from "express";

export const defineMiddlewares = (app: Application) => {
  app.use(bodyParser.json());
};
