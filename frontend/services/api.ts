import { Task, TaskPayload, TaskFilterOptions } from '@/types/task';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const errorMessage = data?.detail || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(err.message || 'Unable to connect to server. Please check your network connection.', 0);
  }
}

export const taskApi = {
  async getTasks(filters: TaskFilterOptions = {}): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
    if (filters.sortBy) params.append('sort_by', filters.sortBy);
    if (filters.sortOrder) params.append('sort_order', filters.sortOrder);

    const queryString = params.toString();
    const endpoint = `/api/tasks${queryString ? `?${queryString}` : ''}`;
    return request<Task[]>(endpoint, { method: 'GET' });
  },

  async getTaskById(id: string): Promise<Task> {
    return request<Task>(`/api/tasks/${id}`, { method: 'GET' });
  },

  async createTask(payload: TaskPayload): Promise<Task> {
    return request<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateTask(id: string, payload: Partial<TaskPayload>): Promise<Task> {
    return request<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTask(id: string): Promise<{ message: string; id: string }> {
    return request<{ message: string; id: string }>(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
