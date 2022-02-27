import { getDb } from "../db";
import { CreateTask, GetTask, UpdateTask } from "./tasks.domain";

const TABLE_NAME = "tasks";

interface TaskRow {
  id: number;
  title: string;
  updated_at: Date;
}

export const createTask = async ({ title }: CreateTask): Promise<number> => {
  const [{ id }] = await getDb(TABLE_NAME)
    .returning("id")
    .insert<{ id: number }[]>({
      title,
      updated_at: new Date(),
    });

  return id;
};

export const getTaskById = async (id: number): Promise<GetTask> => {
  const [row] = (await getDb(TABLE_NAME)
    .select("*")
    .where({ id })) as TaskRow[];

  return !!row ? mapRowToDomain(row) : null;
};

const mapRowToDomain = (row: TaskRow) => {
  return {
    id: row.id,
    title: row.title,
    updatedAt: row.updated_at,
  };
};

export const getAllTasks = async () => {
  const rows = await getDb(TABLE_NAME).select();
  return rows.map(mapRowToDomain);
};

export const updateTaskById = async (id: number, { title }: UpdateTask) => {
  await getDb(TABLE_NAME)
    .update({
      title,
      updated_at: new Date(),
    })
    .where({ id });
};

export const deleteTaskById = async (id: number) => {
  await getDb(TABLE_NAME).delete().where({ id });
};
