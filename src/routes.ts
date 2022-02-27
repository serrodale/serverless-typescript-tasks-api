import { Application } from "express";
import { defineRoutes as defineTasksRoutes } from "./tasks/tasks.routes";
import { defineRoutes as defineTasksListsRoutes } from "./tasks-lists/tasks-lists.routes";

export const defineRoutes = (app: Application) => {
  defineTasksRoutes(app);
  defineTasksListsRoutes(app);
};
