import request from "supertest";
import { getDb } from "../db";
import { app } from "./../main";

describe("tasks-lists.routes.ts", () => {
  describe("POST /tasks-lists", () => {
    it("should respond with a 201 and the task ID if it was successfully created", async () => {
      const response = await request(app).post("/tasks-lists").send({
        title: "test",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        data: {
          id: expect.any(Number),
        },
      });
    });
  });

  describe("GET /tasks-lists/:tasksListId", () => {
    it("should respond with a 400 and the corresponding error message if the ID is not a number", async () => {
      const response = await request(app).get("/tasks-lists/not-a-number");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "ID must be a number.",
      });
    });
  });

  afterAll(async () => {
    await getDb().destroy();
  });
});
