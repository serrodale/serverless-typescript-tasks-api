export class GetTasksList {
  id: number;
  title: string;
  updatedAt: Date;
}

export interface CreateTasksList {
  title: string;
}

export type UpdateTasksList = CreateTasksList;
