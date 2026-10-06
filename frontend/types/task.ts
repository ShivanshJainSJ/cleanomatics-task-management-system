export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskFilterOptions {
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
