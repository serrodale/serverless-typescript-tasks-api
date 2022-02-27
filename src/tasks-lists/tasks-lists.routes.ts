require('express-namespace');

import { Application } from "express";
import { createTasksList, getAllTasksLists } from "./tasks-lists.service";

export const defineRoutes = (app: Application) => {
  app.namespace('/tasks-lists', () => {
    app.post("/", async (req, res) => {
      const name = req.body.name;

      if (!name) {
        return res.status(400);
      }

      res.status(201).json({
        id: await createTasksList({ name })
      });
    });

    app.get("/", async (req, res) => {
      res.status(200).json(await getAllTasksLists());
    });
  });
};
