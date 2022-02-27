import { Application } from "express";
import { query } from "./db";

export const defineRoutes = (app: Application) => {
  app.get("/", async (req, res) => {
    console.log(await query('SELECT * from tables'))
    res.send("Hello World!");
  });
};
