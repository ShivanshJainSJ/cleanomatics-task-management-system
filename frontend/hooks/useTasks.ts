import { useState, useEffect, useCallback } from 'react';
import { Task, TaskPayload, TaskFilterOptions } from '@/types/task';
import { taskApi } from '@/services/api';
import { useDebounce } from './useDebounce';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters: TaskFilterOptions = {
        search: debouncedSearch,
        status: statusFilter,
        priority: priorityFilter,
        sortBy,
        sortOrder,
      };
      const data = await taskApi.getTasks(filters);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter, priorityFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (payload: TaskPayload): Promise<boolean> => {
    try {
      await taskApi.createTask(payload);
      showToast('Task created successfully.', 'success');
      await fetchTasks();
      return true;
    } catch (err: any) {
      showToast(err.message || 'Failed to create task.', 'error');
      return false;
    }
  };

  const updateTask = async (id: string, payload: Partial<TaskPayload>): Promise<boolean> => {
    try {
      await taskApi.updateTask(id, payload);
      showToast('Task updated successfully.', 'success');
      await fetchTasks();
      return true;
    } catch (err: any) {
      showToast(err.message || 'Failed to update task.', 'error');
      return false;
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      await taskApi.deleteTask(id);
      showToast('Task deleted successfully.', 'success');
      await fetchTasks();
      return true;
    } catch (err: any) {
      showToast(err.message || 'Failed to delete task.', 'error');
      return false;
    }
  };

  return {
    tasks,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    toast,
    clearToast,
    refreshTasks: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
