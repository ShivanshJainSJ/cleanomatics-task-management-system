import React from 'react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, ClipboardList, Plus, RefreshCw } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onOpenCreate: () => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onRefresh,
  onOpenCreate,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-5 animate-pulse space-y-3.5"
          >
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-24 bg-neutral-200 dark:bg-white/5 rounded"></div>
            </div>
            <div className="h-4 w-3/4 bg-neutral-200 dark:bg-white/5 rounded"></div>
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-neutral-200 dark:bg-white/5 rounded"></div>
              <div className="h-3 w-2/3 bg-neutral-200 dark:bg-white/5 rounded"></div>
            </div>
            <div className="pt-3 border-t border-light-border dark:border-dark-border/40 flex justify-between">
              <div className="h-3 w-20 bg-neutral-200 dark:bg-white/5 rounded"></div>
              <div className="h-3 w-16 bg-neutral-200 dark:bg-white/5 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light-card dark:bg-dark-card border border-rose-200 dark:border-rose-900/30 rounded-lg p-8 text-center max-w-md mx-auto my-8">
        <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2.5" />
        <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-1">
          Failed to load tasks
        </h3>
        <p className="text-xs text-light-secondary dark:text-dark-secondary mb-4 leading-relaxed">
          {error}
        </p>
        <Button variant="danger" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Retry Connection
        </Button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border dark:shadow-glass-card shadow-subtle-light rounded-lg p-10 text-center max-w-sm mx-auto my-8">
        <div className="w-10 h-10 bg-neutral-100 dark:bg-white/5 text-light-secondary dark:text-dark-secondary rounded-full flex items-center justify-center mx-auto mb-3">
          <ClipboardList className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-1">
          No tasks found
        </h3>
        <p className="text-xs text-light-secondary dark:text-dark-secondary mb-5 leading-relaxed">
          No tasks match your current filters. Get started by creating a new task.
        </p>
        <Button onClick={onOpenCreate} size="sm">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Create your first task
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
