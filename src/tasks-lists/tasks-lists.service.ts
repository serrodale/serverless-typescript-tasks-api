import { CreateTasksList } from "./tasks-lists.domain";
import * as repository from "./tasks-lists.repository";

export const createTasksList = async (tasksList: CreateTasksList) => {
  return repository.createTasksList(tasksList);
};

export const getAllTasksLists = async () => {
  return repository.getAllTasksLists();
};