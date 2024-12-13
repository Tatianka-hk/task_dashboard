export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'In progress',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'Низький',
  MEDIUM = 'Середній',
  HIGH = 'Високий',
  CRITICAL = 'Критичний'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  responsible: string;
  executors: string[];
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskFormData = {
  title: string;
  description: string;
  responsible: string;
  executors: string;
  status: TaskStatus;
  priority: TaskPriority;
};