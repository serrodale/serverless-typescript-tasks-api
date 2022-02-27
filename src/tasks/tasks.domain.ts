export class GetTask {
  id: number;
  title: string;
  updatedAt: Date;
}

export interface CreateTask {
  title: string;
}

export interface UpdateTask extends CreateTask {
  status: string;
}