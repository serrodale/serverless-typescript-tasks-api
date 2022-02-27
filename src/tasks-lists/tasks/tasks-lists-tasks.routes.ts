import "express-namespace";
import { Application } from "express";

import {
  assignTaskToTasksList,
  removeTaskFromTasksList,
} from "./tasks-lists-tasks.service";

export const defineRoutes = (app: Application) => {
  app.namespace("/tasks-lists", () => {
    app.post("/:tasksListId/tasks/:taskId", async (req, res) => {
      const taskId = Number(req.params.taskId);
      const tasksListId = Number(req.params.tasksListId);

      if (!Number.isInteger(taskId) || !Number.isInteger(tasksListId)) {
        return res.status(400).json({
          error: "IDs must be numbers.",
        });
      }

      await assignTaskToTasksList({ taskId, tasksListId });

      res.status(200).json({
        data: "Successfully assigned.",
      });
    });

    app.delete("/:tasksListId/tasks/:taskId", async (req, res) => {
      const taskId = Number(req.params.taskId);
      const tasksListId = Number(req.params.tasksListId);

      if (!Number.isInteger(taskId) || !Number.isInteger(tasksListId)) {
        return res.status(400).json({
          error: "IDs must be numbers.",
        });
      }

      await removeTaskFromTasksList({ taskId, tasksListId });

      res.status(200).json({
        data: "Successfully removed.",
      });
    });
  });
};
