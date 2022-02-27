import { getDb } from "../../db";
import { AssignTaskToTasksList } from "./tasks-lists-tasks.domain";

const TABLE_NAME = "tasks_lists__tasks";

export const assignTaskToTasksList = async ({
  taskId,
  tasksListId,
}: AssignTaskToTasksList) => {
  const [row] = (await getDb(TABLE_NAME)
    .select("*")
    .where({
      tasks_list_id: tasksListId,
      task_id: taskId,
    })) as Tasks_TasksListsRow[];

  if (row) {
    throw new Error("Task is already assigned.");
  }

  await getDb(TABLE_NAME).insert({
    task_id: taskId,
    tasks_list_id: tasksListId,
    assigned_at: new Date(),
  } as Tasks_TasksListsRow);
};

export const removeTaskFromTasksList = async ({
  taskId,
  tasksListId,
}: AssignTaskToTasksList) => {
  const [row] = (await getDb(TABLE_NAME)
    .select("*")
    .where({
      tasks_list_id: tasksListId,
      task_id: taskId,
    })) as Tasks_TasksListsRow[];

  if (!row) {
    throw new Error("Task is not assigned.");
  }

  await getDb(TABLE_NAME).delete().where({
    task_id: taskId,
    tasks_list_id: tasksListId,
  } as Tasks_TasksListsRow);
};

interface Tasks_TasksListsRow {
  task_id: number;
  tasks_list_id: number;
  assigned_at: Date;
}