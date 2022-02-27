import "express-namespace";
import { Application } from "express";

import {
  createTasksList,
  deleteTasksListById,
  getAllTasksLists,
  getTasksListById,
  updateTasksListById,
} from "./tasks-lists.service";

export const defineRoutes = (app: Application) => {
  app.namespace("/tasks-lists", () => {
    app.post("/", async (req, res) => {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({
          error: "Invalid or missing title.",
        });
      }

      res.status(201).json({
        data: {
          id: await createTasksList({ title }),
        },
      });
    });

    app.get("/:id", async (req, res) => {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          error: "ID must be a number.",
        });
      }

      const tasksList = await getTasksListById(id);

      if (!tasksList) {
        return res.status(404).json({
          error: "Tasks list does not exist.",
        });
      }

      res.status(200).json({
        data: tasksList,
      });
    });

    app.get("/", async (req, res) => {
      res.status(200).json({
        data: await getAllTasksLists(),
      });
    });

    app.put("/:id", async (req, res) => {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({
          error: "Invalid or missing title.",
        });
      }

      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          error: "ID must be a number.",
        });
      }

      await updateTasksListById(id, {
        title,
      });

      res.status(200).json({
        data: "Successfully updated.",
      });
    });

    app.delete("/:id", async (req, res) => {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          error: "ID must be a number.",
        });
      }

      await deleteTasksListById(id);

      res.status(200).json({
        data: "Successfully deleted.",
      });
    });
  });
};
