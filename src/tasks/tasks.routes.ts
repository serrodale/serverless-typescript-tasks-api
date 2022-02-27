import "express-namespace";
import { Application } from "express";

import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "./tasks.service";

export const defineRoutes = (app: Application) => {
  app.namespace("/tasks", () => {
    app.post("/", async (req, res) => {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({
          error: "Invalid or missing title.",
        });
      }

      res.status(201).json({
        data: {
          id: await createTask({ title }),
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

      const tasksList = await getTaskById(id);

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
        data: await getAllTasks(),
      });
    });

    app.put("/:id", async (req, res) => {
      const { title, status } = req.body;

      if (!title) {
        return res.status(400).json({
          error: "Invalid or missing title.",
        });
      }

      if (!status) {
        return res.status(400).json({
          error: "Invalid or missing status.",
        });
      }

      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({
          error: "ID must be a number.",
        });
      }

      await updateTaskById(id, {
        title,
        status,
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

      await deleteTaskById(id);

      res.status(200).json({
        data: "Successfully deleted.",
      });
    });
  });
};
