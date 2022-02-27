import { getDb } from "../db";
import { CreateTasksList } from "./tasks-lists.domain";

const TABLE_NAME = "tasks_lists";

export const createTasksList = async ({ name }: CreateTasksList) => {
  const [{ id }] = await getDb(TABLE_NAME)
    .returning("id")
    .insert<{ id: number }[]>({
      name,
      updated_at: new Date(),
    });
  
  return id;
};

export const getAllTasksLists = async () => {
  return await getDb(TABLE_NAME).select();
};
