import { getTable } from "../db";

import {
  CreateTasksList,
  GetTasksList,
  UpdateTasksList,
} from "./tasks-lists.domain";

export const TABLE_NAME = "tasks_lists";

export const createTasksList = async ({
  title,
}: CreateTasksList): Promise<number> => {
  const [{ id }] = await getTable(TABLE_NAME)
    .returning("id")
    .insert<{ id: number }[]>({
      title,
      updated_at: new Date(),
    });

  return id;
};

export const getTasksListById = async (id: number): Promise<GetTasksList> => {
  const [row] = (await getTable(TABLE_NAME)
    .select("*")
    .where({ id })) as TasksListRow[];

  return !!row ? mapRowToDomain(row) : null;
};

const mapRowToDomain = (row: TasksListRow) => {
  return {
    id: row.id,
    title: row.title,
    updatedAt: row.updated_at,
  };
};

export const getAllTasksLists = async () => {
  const rows = await getTable(TABLE_NAME).select();
  return rows.map(mapRowToDomain);
};

export const updateTasksListById = async (
  id: number,
  { title }: UpdateTasksList
) => {
  await getTable(TABLE_NAME)
    .update({
      title,
      updated_at: new Date(),
    })
    .where({ id });
};

export const deleteTasksListById = async (id: number) => {
  await getTable(TABLE_NAME).delete().where({ id });
};

interface TasksListRow {
  id: number;
  title: string;
  updated_at: Date;
}
